const {
  GraphQLServer
} = require('graphql-yoga');
const {
  Prisma
} = require('prisma-binding');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const Subscription = require('./resolvers/Subscription')
const Feed = require('./resolvers/Feed')

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Subscription,
  Feed
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'database/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/christian-nwamba-fd2dcf/hackernews-node/dev',
      debug: true
    })
  })
});

server.start(({port: 4000}), () => console.log(`Server is running on http://localhost:4000`));
