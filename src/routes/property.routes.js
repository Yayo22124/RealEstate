import {
    findForm,
    findOneProperty,
    formProperty,
    insertProperty,
    updateForm,
    updateProperty
} from "../controllers/property.controller.js"

import Express from "express";

// import propertyController from "../controllers/PropertyReto.controller.js"

const router = Express.Router();

router.get("/create/", formProperty);
router.post("/create/insert", insertProperty);
router.get("/find", findForm);
router.post("/find", findOneProperty);
router.get("/update/:id", updateForm);
router.post("/update/:id", updateProperty);
// router.post("/register-property", propertyController.registerProperty);

export default router;