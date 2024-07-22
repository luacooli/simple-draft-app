import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://git.heroku.com/arcane-spire-10247.git',
  }),
  cache: new InMemoryCache(),
});

export default client;
