import accountService from "../services/accountService.js";

// Function to handle user login
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

// Function to handle user signup
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

// Function to handle getting the user profile
const getAccountProfile = async (req, res) => {
    const userEmail = req.user.email;  // Assuming email is extracted from the authenticated token

    const result = await accountService.getAccountInfo(userEmail);
    if (result.status === 'success') {
        return res.status(200).json({
            message: "Profile retrieved successfully",
            data: result.account
        });
    } else {
        return res.status(404).json({ message: result.message });
    }
};

// Function to handle updating the user profile
const updateAccountProfile = async (req, res) => {
    const userEmail = req.user.email;  // Assuming email is extracted from the authenticated token
    const updateData = {
        username: req.body.username,
        full_name: req.body.full_name,  // Ensure this key matches the input
        phone_number: req.body.phone_number
    };

    const result = await accountService.updateAccountInfo(userEmail, updateData);
    if (result.status === 'success') {
        res.status(200).json(result);
    } else {
        res.status(500).json({ message: result.message });
    }
};

export default {
    handleLogin,
    handleSignup,
    handleLogout,
    getAccountProfile,
    updateAccountProfile
};