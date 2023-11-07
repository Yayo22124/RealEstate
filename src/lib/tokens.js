import dotenv from 'dotenv'
import jwt from "jsonwebtoken";

dotenv.config({ path: "src/.env" });

// ! Token ID Propio para creación de usuarios y restablecer passwords
const generateID = () => Date.now().toString(32) + Math.random().toString(32).substring(3)

//! JWT Auth
const jwtToken = (userId) => jwt.sign({ // Datos para jwt
    domain: process.env.JWT_DOMAIN,
    author: process.env.JWT_AUTHOR,
    signature: process.env.JWT_SIGNATURE,
    year: process.env.JWT_YEAR,
    userId
}, process.env.JWT_HASHSTRING, {
    expiresIn: '1h'
});

export {
    jwtToken,
    generateID
}
