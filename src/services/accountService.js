import bcrypt from "bcryptjs";
import db from '../models/index.js';
import jwt from 'jsonwebtoken';
const salt = bcrypt.genSaltSync(10);

// console.log(db);  // Check the entire db object
// console.log(db.Account);  // Specifically check the Account model

// Handle user login
const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = {};
      const isExist = await checkUserEmail(email);
      if (isExist) {
        const user = await db.Account.findOne({
          attributes: ["email", "role_id", "password"],
          where: { email },
          raw: true,
        });
        if (user) {
          const check = await bcrypt.compare(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Success";
            // Remove password from the user object to be safe
            delete user.password;

            // Generate token
            const token = jwt.sign(
              { email: user.email, role_id: user.role_id, id: user.id  },
              process.env.ACCESS_TOKEN_SECRET,  // Make sure to use a secret key from your environment
              { expiresIn: '24h' }  // Token expires in 24 hours
            );

            // Include token in the userData object
            userData.token = token;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User not found!";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Your email isn't in the system. Please try again.";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

const checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.Account.findOne({
        where: { email: userEmail },
      });
      resolve(!!user);
    } catch (e) {
      reject(e);
    }
  });
};

// Handle user signup
let handleUserSignup = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      const currentDate = new Date();
      let newUser = await db.Account.create({
        username: data.username,
        password: hashPasswordFromBcrypt,
        email: data.email,
        device_id: 'device' + currentDate.toISOString(), // Combine 'device' with create date
        full_name: data.fullname,
        phone_number: data.phonenumber,
        status: 'active', // Set default status
        create_date: currentDate,
        update_date: currentDate,
        role_id: data.roleId // Add role_id, use default if not provided
      });
      resolve(newUser);
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const getAccountInfo = async (email) => {
  try {
    const account = await db.Account.findOne({
      where: { email: email },
      include: [ ]
    });

    if (!account) {
      return { status: 'error', message: 'Account not found' };
    }

    const profileData = account.role_id === 'candidate' ? account.Candidate : account.Recruiter;

    const response = {
      status: 'success',
      account: {
        id: account.id,
        username: account.username,
        email: account.email,
        fullName: account.full_name,
        phoneNumber: account.phone_number,
        role_id: account.role_id
      },
      profile: profileData
    };

    return response;
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

const updateAccountInfo = async (email, updateData) => {
  try {
    const account = await db.Account.findOne({ where: { email: email } });
    if (!account) {
      return { status: 'error', message: 'Account not found' };
    }

    console.log('Original Account:', account);

    // Update the account with provided data, except for role_id
    const updatedAccount = await account.update({
      username: updateData.username || account.username,
      full_name: updateData.full_name || account.full_name,  // Ensure this key matches the input
      phone_number: updateData.phone_number || account.phone_number,
      update_date: new Date()  // Update the update_date to current date
    });

    console.log('Updated Account:', updatedAccount);

    return {
      status: 'success',
      message: 'Profile updated successfully',
      account: {
        id: updatedAccount.id,
        username: updatedAccount.username,
        email: updatedAccount.email,
        full_name: updatedAccount.full_name,  // Ensure this key matches the updated field
        phone_number: updatedAccount.phone_number,
        role_id: updatedAccount.role_id // Ensure role_id is not updated
      }
    };
  } catch (error) {
    console.log('Error updating account:', error);
    return { status: 'error', message: 'Failed to update account: ' + error.message };
  }
};

export default {
  handleUserLogin,
  handleUserSignup,
  updateAccountInfo,
  getAccountInfo,
};

