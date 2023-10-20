import  Express  from "express";
import propertyController from "../controllers/Property.controller.js"

const router = Express.Router();

router.get("/", propertyController.formProperty);
router.post("/register-property", propertyController.registerProperty);

export default router;