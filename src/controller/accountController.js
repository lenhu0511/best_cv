import accountService from "../services/accountService.js";


let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  let userData = await accountService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
    token: userData.token
  });
};

let handleSignup = async (req, res) => {
    try {
        let newUser = await accountService.handleUserSignup(req.body);
        return res.status(201).json(newUser);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

// module.exports = {
//   handleLogin: handleLogin,
// };

export default {handleLogin, handleSignup};
