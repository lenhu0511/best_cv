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
              { email: user.email, role_id: user.role_id },
              'your_secret_key',  // Make sure to use a secret key from your environment
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
        role_id: data.roleId || 'default_role_id' // Add role_id, use default if not provided
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

export default {handleUserLogin, handleUserSignup};
