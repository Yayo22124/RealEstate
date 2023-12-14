import {
    findForm,
    findOneProperty,
    formAddImage,
    formProperty,
    insertProperty,
    loadImage,
    updateForm,
    updateProperty
} from "../controllers/Property.controller.js"

import Express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import upload from "../middlewares/uploadImage.js"

// import propertyController from "../controllers/PropertyReto.controller.js"

const router = Express.Router();

router.get("/create/", protectRoute, formProperty);
router.post("/create/insert", protectRoute, insertProperty);
router.get('/create/addImage/:id', protectRoute, formAddImage)
router.post('/create/loadImage/:id', protectRoute, upload.single('imageBox'), loadImage)
router.get("/find", protectRoute, findForm);
router.post("/find", protectRoute, findOneProperty);
router.get("/update/:id", protectRoute, updateForm);
router.post("/update/:id", protectRoute, updateProperty);
// router.post("/register-property", propertyController.registerProperty);

export default router;