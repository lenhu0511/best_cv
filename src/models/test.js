import db from './index.js';

// Assuming db is exported directly and contains the Account model
async function testAccountModel() {
  try {
    const account = await db.Account.findOne({ where: { email: "lenhu0460@gmail.com" } });
    console.log(account);
  } catch (error) {
    console.error('Error testing Account model:', error);
  }
}

testAccountModel();
