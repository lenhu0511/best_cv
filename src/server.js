import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import initWebRoutes from './route/web.js';
import db from './models/index.js'; // Updated import to get db directly
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); // This will load the .env file and make the variables available via process.env

// console.log('Access token secret:', process.env.ACCESS_TOKEN_SECRET);

// const secretKey = process.env.ACCESS_TOKEN_SECRET;
// const token = jwt.sign({ data: 'some data' }, secretKey, { expiresIn: '2h' });
// jwt.verify(token, secretKey, function(err, decoded) {
//   if (err) {
//     console.log('Token verification failed.');
//   } else {
//     console.log('Decoded JWT:', decoded);
//   }
// });

const allowedOrigins = [
  'http://localhost:6969',
  'https://https://best-cv.netlify.app/',
  'https://best-cv.azurewebsites.net/'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['*'],
  exposedHeaders: ['custom-header1', 'custom-header2']
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 6969;
// const corsOptions = {
//     origin: true, 
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     methods: 'GET,POST,PUT,DELETE,OPTIONS'
// };
app.use(express.json());
app.use(cors(corsOptions));

// Load and setup Swagger documentation
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

// Ensure database connection is established before starting the server
db.sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
  initWebRoutes(app, db);
  app.listen(port, () => {
    console.log("Backend Nodejs is running on the port : " + port);
  });
}).catch(error => {
  console.error('Failed to initialize database:', error);
  process.exit(1); // Exit the process with an error code
});
