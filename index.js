require('dotenv').config();

const express = require('express');

const app = express();

const cors = require('cors');

const expressSwagger = require('express-swagger-generator')(app);

const apiRouter = require('./app/router');

const port = process.env.PORT || 5461;

app.use(cors());

// lets the server know it will receive data as JSON
app.use(express.json());

app.use('/v1', apiRouter);

let options = {
  swaggerDefinition: {
      info: {
          description: 'A blog REST API',
          title: 'Oblog',
          version: '1.0.0',
      },
      host: `localhost:${port}`,
      basePath: '/v1',
      produces: [
          "application/json",
          "application/xml"
      ],
      schemes: ['http', 'https']
  },
  basedir: __dirname, //app absolute path
  files: [
      './app/router.js',
      './app/models/*.js'
  ] //Path to the API handle folder
};

expressSwagger(options);

app.listen(port, () => console.log(`Server running on port ${process.env.PORT}`));