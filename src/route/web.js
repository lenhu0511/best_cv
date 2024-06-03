import express from "express";
import accountController from "../controller/accountController.js";

let router = express.Router();

const initWebRoutes = (app) => {  
  router.post('/api/signup', accountController.handleSignup);
  router.post('/api/login', accountController.handleLogin);

  return app.use("/", router);
}

export default initWebRoutes;