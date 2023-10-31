import  Express  from "express";
import userController from "../controllers/user.controller.js"

const router = Express.Router();

router.get("/", userController.formLogin)
router.get("/login/register", userController.formRegister);
router.get("/login/recovery", userController.formPasswordRecovery);
router.post("/login/register-account", userController.insertUser);

// confirm account
router.get("/login/confirm/:token", userController.confirmAccount)

// Reset Password
router.post("/login/password-recovery", userController.resetPassword);
// Change Password
// router.post("/login/change-password/:tokenPassword", userController.changePassword);

export default router;