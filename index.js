require('dotenv').config();

const { json } = require('express');

// instanciating GraphQL server and configuring it
const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

const app = server.express;

const cors = require('cors');

const expressSwagger = require('express-swagger-generator')(app);

const apiRouter = require('./app/router');

const port = process.env.PORT || 5461;

app.use(cors());

// lets the server know it will receive data as JSON
app.use(json());

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

server.start({ port }, () => console.log(`Server is running on localhost:${port}`));