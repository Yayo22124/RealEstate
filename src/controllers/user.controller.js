import { check, validationResult } from "express-validator";

import User from "../models/User.model.js"
import { generateID } from "../lib/tokens.js";
import { response } from "express"

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
  
  if (result.isEmpty() ) {
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
      res.send("User created")
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

export default userController;

