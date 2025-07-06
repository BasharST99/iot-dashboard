import { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IoT Dashboard API',
      version: '1.0.0',
      description: 'API documentation for the IoT Dashboard',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export default options;
