import db from "../models/index.js";
import CRUDService from "../services/CRUDService.js";

// let getHomePage = async (req, res) => {
//     try {
//         let data = await db.Account.findAll();
//         return res.render('homepage.ejs', {
//             data: JSON.stringify(data)
//         });
//     } catch (e) {
//         console.log(e);
//     }
// };

// let getAboutPage = (req, res) => {
//     return res.render('test/about.ejs');
// };

// let getCRUD = (req, res) => {
//     return res.render('crud.ejs');
// };

// let postCRUD = async (req, res) => {
//     let message = await CRUDService.createNewUser(req.body);
//     console.log(message);
//     return res.send('post crud');
// };

let signup = async (req, res) => {
    try {
        let newUser = await CRUDService.signupUser(req.body);
        return res.status(201).json(newUser);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

export default signup;
