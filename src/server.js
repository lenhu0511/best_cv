// import express from "express";
// import bodyParser from "body-parser";
// import viewEngine from "./config/viewEngine";
// import initWebRouters from "./route/web"
// import connectDB from "./config/connectDB"
// require('dotenv').config();

// let app = express();

// //config app

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}))

// viewEngine(app);
// initWebRouters(app);

// connectDB();

// let port = process.env.PORT || 6969;
// //port === undefines => port = 6969

// app.listen(port, () => {
//     //callback
//     console.log("Backend Nodejs is running on the port : " + port)
// })

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises'; // Sử dụng fs/promises để đọc file JSON

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Hàm async để nạp swagger.json
async function loadSwaggerDocument() {
  const swaggerPath = path.join(__dirname, './swagger-output.json');
  const swaggerDocument = JSON.parse(await fs.readFile(swaggerPath, 'utf-8'));
  return swaggerDocument;
}

loadSwaggerDocument().then(swaggerDocument => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log("Backend Nodejs is running on the port : " + port);
});
