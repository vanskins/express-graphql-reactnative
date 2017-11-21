import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { createServer } from 'http';
import constants from './config/constants';
import './config/db';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
const app = express();
import mocks from './mocks';
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

app.use(bodyParser.json());
app.use('/graphiql', graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH
}))
app.use(constants.GRAPHQL_PATH, graphqlExpress({
  schema
}))
const graphQLServer = createServer(app);
mocks().then(() => {
  graphQLServer.listen(constants.PORT, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Port is running and listening to ${constants.PORT}`);
    }
  });
})
