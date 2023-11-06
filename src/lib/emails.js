import dotenv from "dotenv";
import nodemailer from "nodemailer"

dotenv.config({ path: "src/.env" })

let transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const emailRegister = async (userData) => {

    const { name, email, token } = userData;

    await transport.sendMail({
        from: "220087@utxicotepec.edu.mx",
        to: email,
        subject: "Welcome to RealState - 220087 - Confirm your account",
        text: `Thank you for chosing us, in our platform, you could sell and buy properties, to continue please follow confirmation link below: link`,
        html: `
            <div class="background-color: red;">
                <p>Hello, ${name}, you are verifying your account on RealState.com</p>
                <p>Your account is almost active please follow the activation link below: <a target="_blank" href="http://localhost:3000/bienes-raices/users/login/confirm/${token}">Click Here to Active Your Account.</a></p>
                <p>If you didnt create this account just ignore this email.</p>
            </div>
        `
    });

    console.log(`
        ######### MailTrap ############ \n 
            Se está intentando enviar un correo electrónico al usuario: ${userData.email}, con el token de validación: ${userData.token} 
        \n #####################`
    );
}

const emailResetPassword = async (userData) => {

    const { email, name, tokenPassword } = userData;

    await transport.sendMail({
        from: "220087@utxicotepec.edu.mx",
        to: email,
        subject: "RealState - 220087 -  Reset your Password",
        text: `We have recieved your password change request, please follow the link below.`,
        html: `
        <section class="width:100%;:flex;align-items:center;background-color:#E9F1F7;justify-content:space-around;">
        <span class="color:#30292F;"><strong class="color: #623CEA;font-weight:800;">Real</strong>State</span>
        <div class="width:auto;display:flex;align-items:center;gap:6px;">
            <a href="#" class="display:flex;align-items:center;">
                <img src="/src/public/img/brand-facebook" alt="facebook">
            </a>
            <a href="#" class="display:flex;align-items:center;">
                <img src="/src/public/img/brand-instagram" alt="instagram">
            </a>
            <a href="#" class="display:flex;align-items:center;">
                <img src="/src/public/img/brand-x" alt="x">
            </a>
        </div>
    </section>
    <section class="width:100%;">
        <h1>Reset Password Request</h1>
        <p>Please follow the reset password link below: <a target="_blank" href="http://localhost:3000/bienes-raices/users/login/change-password/${tokenPassword}"> Here to Change your Password.</a></p>
        <p>If you didnt request a password recovery just ignore this email.</p>
    </section>
    <section class="display:flex;align-items:center;justify-content:center;">
        <hr>
        <p>CEO Eli Haziel Ortiz Ramirez of RealState Corp 2023</p>
    </section>
        `
    });

    console.log(`
        ######### MailTrap ############ \n 
            Se está intentando enviar un correo de Cambio de Contraseña al usuario: ${email}, con el token de validación: ${tokenPassword} 
        \n #####################`
    );
}

export {
    emailRegister,
    emailResetPassword
};