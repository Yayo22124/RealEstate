import { check, validationResult } from "express-validator";
import { emailRegister, emailResetPassword } from "../lib/emails.js";

import User from "../models/User.model.js"
import { generateID } from "../lib/tokens.js";

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
  // TODO: Paginas de respuesta
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

  // TODO: Crear el token para cambiar la contraseña
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
      // TODO: Enviar correo de acceso al cambio de contraseña
      emailResetPassword({
        
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
        name: req.body.name,
        email: req.body.email
      }
    });
  }
}

export default userController;