import express from "express";
import homeController from "../controller/homeController.js";
import accountController from "../controller/accountController.js";

let router = express.Router();

const initWebRoutes = (app) => {  
  router.post('/api/signup', homeController.signup);

  router.post('/api/login', accountController.handleLogin);

  return app.use("/", router);
}

export default initWebRoutes;