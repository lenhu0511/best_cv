import express from "express";
import homeController from "../controller/homeController.js";
import accountController from "../controller/accountController.js";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);

    router.post('/api/login', accountController.handleLogin);

    router.get('/home', (req, res)=> {
        return res.send('This is home page Best CV')
    });

    return app.use("/", router);
}

// module.exports = initWebRoutes;
export default initWebRoutes;