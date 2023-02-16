import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://yoo-sushi-native.foxhub.space/',
  cache: new InMemoryCache(),
});

export default client;
