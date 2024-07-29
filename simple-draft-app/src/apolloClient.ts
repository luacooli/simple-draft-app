import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

// https://agile-bastion-22685-50d2c5bec5e4.herokuapp.com/ | https://git.heroku.com/agile-bastion-22685.git

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/',
  }),
  cache: new InMemoryCache(),
})

export default client
