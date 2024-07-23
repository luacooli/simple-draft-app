import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

// https://desolate-retreat-55784-2709b8131f4d.herokuapp.com/ | https://git.heroku.com/desolate-retreat-55784.git
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/',
  }),
  cache: new InMemoryCache(),
})

export default client
