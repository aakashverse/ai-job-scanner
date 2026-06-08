const {Router} = require("express");
const authRouter = Router();
const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");


/** POST: register**/
authRouter.post("/register", authController.registerController);

/** POST: login**/
authRouter.post("/login", authController.loginController);

/** GET: logout**/
authRouter.get("/logout", authController.logoutController);

/** GET: get-me**/
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController);

module.exports = authRouter;