import * as express from "express";
import userController from "../controllers/user-controller.js";
import { body } from "express-validator";
import userService from "../services/user-service.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/signup",  
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}), 
    userController.signUp);
router.post("/signin", userController.signIn);
router.post("/signout", userController.signOut);
router.get("/refresh", userController.refresh);
router.get("/activate/:link", userController.activate);
router.get("/getusers", authMiddleware, userController.getUsers);

export default router;