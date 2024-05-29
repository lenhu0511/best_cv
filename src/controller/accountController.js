import bcrypt from "bcryptjs";
import db from '../models/index.js';

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
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found!`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your email isn't in the system. Please try again.`;
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

export default handleUserLogin;
