const protectRoute = async (req, res, next) => {
    console.log("Hola desde middleware");
    // TODO: Verificar si hay un tokem
    const { _token } = req.cookies;

    if (!_token) {
        // TODO: Verificar el token
        return res.redirect("/bienes-raices/user/login")
    }

    try {

    } catch (error) {

        return res.clearCookie("_token").redirect("/bienes-raices/user/login")
    }

    next();
}

export default protectRoute;