const {
  typeDefs: foodTypeDefs,
  resolvers: foodResolvers,
} = require('./schema/foodSchema');

const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require('./schema/userSchema');

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const server = new ApolloServer({
  typeDefs: [foodTypeDefs, userTypeDefs],
  resolvers: [foodResolvers, userResolvers],
});

startStandaloneServer(server, { port: process.env.PORT || 4000 }).then(
  ({ url }) => {
    console.log(`Server ready at ${url}`);
  }
);
