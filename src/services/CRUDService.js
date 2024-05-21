import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import db from '../models/index.js'

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.Account.create({
        id: "2",
        username: data.username,
        password: hashPasswordFromBcrypt,
        email: data.email,
        device_id: "12324324254",
        full_name: data.fullname,
        phone_number: data.phonenumber,
        status: 'active',
        create_date: "2024-1-4",
        update_date: "2024-1-4",
        role_id: data.roleId,
      })
      resolve('ok create a new user');
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

// module.exports = {
//   createNewUser: createNewUser,
// };
export default createNewUser;