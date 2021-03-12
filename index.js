const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const app = express();


const server = new ApolloServer({
typeDefs,
resolvers,
  context: ({ req, connection }) => ({ 
    token : req ? req.headers.authorization : connection.context.authorization
  })
})

server.applyMiddleware({ app, path: '/graphql'})
app.listen({ port: 4000 }, ()=> {
  console.log(`Apollo Server on http://localhost:4000${server.graphqlPath}`);
})