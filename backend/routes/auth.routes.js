import { Router } from "express";
import { login, logout } from "../controllers/auth.controller.js";
import { sessionMiddleware } from "../middlewares/session.middleware.js"

const authRoute = Router();

authRoute.route("/login").post(login);
authRoute.route("/logout").get(sessionMiddleware, logout);

export { authRoute };