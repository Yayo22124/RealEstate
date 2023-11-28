const protectRoute = async (req, res, next) => {
    console.log("Hola desde middleware");
    next();
}

export default protectRoute;