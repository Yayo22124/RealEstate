import { check, validationResult } from "express-validator";
import { emailRegister, emailResetPassword } from "../lib/emails.js";
import { generateID, jwtToken } from "../lib/tokens.js";

import User from "../models/User.model.js"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';

dotenv.config({ path: "src/.env" });

const userController = {};


userController.formLogin = (req, res) => {
  res.render('auth/login.pug', {
    page: 'Login',
    isLogged: false,
  })
}


userController.formRegister = (req, res) => {
  res.render("auth/register.pug", {
    page: 'Creating New Account'
  })
}


userController.formPasswordRecovery = (req, res) => {
  res.render("auth/password-recovery.pug", {
    page: 'Password Recovery'
  })
}


userController.insertUser = async (req, res) => {
  console.log('El usuario está intentando registrar sus datos en la base de datos');
  await check('name').notEmpty().withMessage('Name field is required').run(req);
  await check('email').notEmpty().withMessage('Email field is required').isEmail().withMessage('This field should be an Email (user@domain.ext) and not empty').run(req);

  //! validate min and max password
  await check('password').notEmpty().withMessage('Password field is required').isLength({ min: 8 }).withMessage('Password must contain at least of 8 characters').isLength({ max: 20 }).withMessage('Password must contain less than 20 characters').equals(req.body.repeatPassword).withMessage("Both password must be the same.").run(req);
  // validate repeat password

  let result = validationResult(req);


  // Validate duplicate emails

  if (result.isEmpty()) {
    // Desestructure Object Body
    const { name, email, password } = req.body;
    const token = generateID();
    console.log(`Intentando insertar al usuario: ${name}, con correo electrónico: ${email}, password: ${password} y token: ${token}`);

    const userExists = await User.findOne({ where: { email: email } })
    console.log(userExists);
    if (userExists) {
      return res.render("auth/register.pug", {
        page: `Creating New Account`,
        errors: [{ msg: `The user with: ${email} already exists.` }],
        //! Sending params to pug 
        user: {
          name: req.body.name,
          email: req.body.email
        }
      });
    } else {
      const newUser = await User.create({
        name,
        email,
        password,
        token
      });

      //! Sending confirmation email 
      emailRegister({
        name,
        email,
        token
      })
      // response when user was created
      res.render('templates/message.pug', {
        page: "User Created Successfull",
        message: `We have sent you an email to: ${email}, please verify your account`,
        type: "Info"
      })
    }

  } else {
    return res.render("auth/register.pug", {
      page: `Creating New Account`,
      errors: result.array(),
      //! Sending params to pug 
      user: {
        name: req.body.name,
        email: req.body.email
      }
    });
  }


}

userController.confirmAccount = async (req, res, next) => {
  // Get token of URL (request)
  const { token } = req.params;
  // Verify if token already exists
  let userToken = await User.findOne({ where: { token } });
  //  Paginas de respuesta
  if (!userToken) {
    console.log(`This token is invalid `);
    res.render('templates/message.pug', {
      page: "Error in Validation Process",
      notificationTitle: "The token is invalid ",
      notificationMessage: "The token is invalid ",
      type: "warning"
    })
  } else {
    console.log(`This token is valid`);
    userToken.verified = true;
    userToken.token = null;
    userToken.save();

    res.render('templates/message.pug', {
      page: "Validation Complete",
      notificationTitle: "Your account has been confirmed",
      notificationMessage: "Your account has been confirmed",
      type: "Info"
    })
  }
}

userController.resetPassword = async (req, res) => {
  // Validar que el correo no este vació
  await check('email').notEmpty().withMessage('Email field is required').isEmail().withMessage('The Email field should be an Email (user@domain.ext) and not empty').run(req);

  let result = validationResult(req);

  // Validar la existencia del usuario a tráves del Email
  const { email } = req.body;
  const userExists = await User.findOne({ where: { email } });

  // Validar que result no tenga errores
  if (result.isEmpty()) {
    // Validar que el correo exista
    if (!userExists) {
      // Página de error
      console.log(`El usuario con correo ${email}`);
      res.render('templates/message.pug', {
        page: "Recovery Password",
        notificationTitle: `Error Email not Found`,
        notificationMessage: "The token is invalid ",
        type: "Error"
      })
    } else {
      //  Crear el token para cambiar la contraseña
      const tokenPassword = generateID();
      userExists.token = tokenPassword;
      userExists.save();

      //  Enviar correo de acceso al cambio de contraseña
      emailResetPassword({
        email,
        tokenPassword
      })
      console.log(`El usuario con correo ${email}`);
      res.render('templates/message.pug', {
        page: "Recovery Password",
        notificationTitle: ` Email Found`,
        notificationMessage: "The  is invalid ",
        type: "Info"
      })

    }
  } else {
    return res.render("auth/password-recovery.pug", {
      page: `Recovery Password`,
      errors: result.array(),
      //! Sending params to pug 
      user: {
        email: req.body.email
      }
    });
  }
}

userController.changePassword = async (req, res) => {
  const { tokenPassword } = req.params;

  // Verify if token already exists
  let userToken = await User.findOne({ where: { token: tokenPassword } });
  //  Paginas de respuesta
  if (!userToken) {
    console.log(`This token is invalid `);
    res.render('templates/message.pug', {
      page: "Error in Validation Process",
      notificationTitle: "The token is invalid ",
      notificationMessage: "The token is invalid ",
      type: "warning"
    })
  } else {
    res.render("auth/password-change.pug", {
      page: `Change Password`,
      tokenPassword: tokenPassword
    });
  }
}

userController.updatePassword = async (req, res) => {
  const { tokenPassword } = req.params;
  const { newPassword } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Verify if token already exists
  let userToken = await User.findOne({ where: { token: tokenPassword } });
  if (!userToken) {
    console.log(`This token is invalid `);
    res.render('templates/message.pug', {
      page: "Error in Validation Process",
      notificationTitle: "The token is invalid ",
      notificationMessage: "The token is invalid ",
      type: "Warning"
    })
  } else {
    console.log(`Intentando actualizar la contraseña en la bd`);
    userToken.token = null;
    userToken.password = hashedPassword;
    userToken.save();
    res.render('templates/message.pug', {
      page: "Error in Validation Process",
      notificationTitle: "Change Password Success ",
      notificationMessage: "The token is invalid ",
      type: "Info"
    })
  }

}

// Authenticate User
userController.authenticateUser = async (req, res) => {
  // Validar los datos del formulario
  await check('email').notEmpty().withMessage('Email field is required').isEmail().withMessage('The Email field should be an Email (user@domain.ext) and not empty').run(req);
  await check('password').notEmpty().withMessage('Password field is required').isLength({
    min: 8,
    max: 20
  }).withMessage('The password is formed between 8 and 20 characters.').run(req);

  // Desestructurar los datos del body (formulario)
  const { email, password } = req.body;

  let result = validationResult(req);

  console.log(`El usuario: ${email} está intentando autenticarse.`);

  if (result.isEmpty()) {
    // Validar que exista el correo electrónico
    const userExists = await User.findOne({ where: { email } });

    // Validar que el correo exista
    if (!userExists) {
      // Página de error
      res.render('templates/message.pug', {
        page: "Error in Login",
        notificationTitle: `Error Email not Found`,
        notificationMessage: `The user with email: ${email} do not exist.`,
        type: "Error"
      })
    } else {
      //  Validar que el usuario esté validado
      if (!userExists.verified) {
        console.log(`El usuario con correo ${email}`);
        res.render('templates/message.pug', {
          page: "Error in login",
          notificationTitle: ` Account is not validated `,
          notificationMessage: `The user associated to the email: ${email} is not verified, please check your email.`,
          type: "Warning"
        })
      } else {
        //  Validar la contraseña ingresada con la asignada al correo electrónico (usuario)
        if (userExists.verifyPassword(password)) {
          //  Generar el Token de Acceso (JWT)
          const token = jwtToken(userExists.id); // Enviar userID
          console.log(`JWT generado es: ${token}`);

          // TODO: Almacenar el JWT en una cookie
          // TODO: Redireccionar al home
          res.cookie('_token',token,{
            httpOnly: true,
            //secure: true, // option to configure https protocol certify

          }).redirect('/bienes-raices/user/');
         
        } else {
          res.render("auth/login.pug", {
            page: `Login`,
            errors: [{
              msg: `The email or password doesn't match.`
            }],
            //! Sending params to pug 
            user: {
              email: req.body.email
            }
          });
        }
      }


    }


  } else {
    return res.render("auth/login.pug", {
      page: `Login`,
      errors: result.array(),
      //! Sending params to pug 
      user: {
        email: req.body.email
      }
    });
  }
}

userController.homePage = (req,res) => {
  res.render('user/home.pug',{
    page: 'My Properties',
    showHeader: true,
    user: {
      name: 'marco'
    }
  })
}
export default userController;