const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
  }

  type Query {
    notes: [Note]
  }

  type Mutation {
    saveNote(content: String!): Note
  }
`;

let notes = [];
let idCounter = 0;

const resolvers = {
  Query: {
    notes: () => notes,
  },
  Mutation: {
    saveNote: (_, { content }) => {
      const newNote = { id: idCounter++, content };

      notes.push(newNote);
      return newNote;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
