import express from "express";
import { register, login } from "../controllers/authController";
import { validate } from "../middlewares/validate";
import { registerRules, loginRules } from "../middlewares/authValidation";

const router = express.Router();

router.post("/register", validate(registerRules), register);
router.post("/login", validate(loginRules), login);

export { router };
