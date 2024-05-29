import swaggerAutogen from 'swagger-autogen';
import path from 'path';

const doc = {
    info: {
      title: 'My API',
      description: 'Description'
    },
    host: 'localhost:6969'
  };
  
  const outputFile = './swagger-output.json';
  const routes = ['./src/route/web.js'];
  
  console.log('Output file:', path.resolve(outputFile));
  console.log('Routes file:', path.resolve(routes[0]));
  /* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
  root file where the route starts, such as index.js, app.js, routes.js, etc ... */
  
  swaggerAutogen(outputFile, routes, doc);