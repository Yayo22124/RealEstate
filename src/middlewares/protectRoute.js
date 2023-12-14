import User from '../models/User.model.js'
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({path:"src/.env"})




const protectRoute = async (req,res,next) =>{
    console.log("Hola desde el middleware")
    //Verificar la existencia de un token
    const { _token } = req.cookies
    if(!_token){
        return res.redirect('/bienes-raices/user/login')
    }
    //Verificar el token 
    try {
        const decodedJWT = jwt.verify(_token, process.env.JWT_HASHSTRING)
        //console.log(decodedJWT)
        const loggedUser = await User.findByPk(decodedJWT.userId)
        if(!loggedUser){
            //console.log("El usuario no existe")
            return res.clearCookie("_token").redirect("/bienes-raices/user/login")
        }else{
            req.User = loggedUser
            
        }
    } catch (error) {
        return res.clearCookie("_token").redirect("/bienes-raices/user/login")
    }
    next()
}






export default protectRoute;