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

let handleLogout = async (req, res) => {
    // You can add logic here to blacklist the token or notify the client to discard the token
    return res.status(200).json({
        message: "Logged out successfully."
    });
};

const manageAccountProfile = async (req, res) => {
  const userId = req.user.id;  // Assuming `req.user` is populated by authentication middleware
  const profileData = req.body;
  const action = req.method === 'GET' ? 'get' : 'update';  // Determine action based on HTTP method

  const result = await accountService.manageProfile(userId, profileData, action);
  if (result.status === 'success') {
    res.status(action === 'get' ? 200 : 202).json(result.profile);
  } else {
    res.status(500).json({ message: result.message });
  }
};

export default {handleLogin, handleSignup, handleLogout, manageAccountProfile}; 

