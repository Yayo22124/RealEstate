import Express from "express";
import {
    formProperty
} from "../controllers/property.controller.js"

// import propertyController from "../controllers/PropertyReto.controller.js"

const router = Express.Router();

router.get("/create/", formProperty);
// router.post("/register-property", propertyController.registerProperty);

export default router;