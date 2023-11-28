import {
    findForm,
    findOneProperty,
    formProperty,
    insertProperty,
    updateForm,
    updateProperty
} from "../controllers/Property.controller.js"

import Express from "express";
import protectRoute from "../middlewares/protectRoute.js";

// import propertyController from "../controllers/PropertyReto.controller.js"

const router = Express.Router();

router.get("/create/", formProperty);
router.post("/create/insert", protectRoute,insertProperty);
router.get("/find", findForm);
router.post("/find", findOneProperty);
router.get("/update/:id", updateForm);
router.post("/update/:id", updateProperty);
// router.post("/register-property", propertyController.registerProperty);

export default router;