import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import initWebRoutes from './route/web.js';
import db from './models/index.js'; // Updated import to get db directly

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 6969;

app.use(express.json());
app.use(cors());

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
