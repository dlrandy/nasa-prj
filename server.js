const express = require("express");
const path = require("path");
const { buildSchema } = require("graphql");
// const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { ApolloServer } = require("apollo-server-express");
const ProductsModel = require("./products/products.model");
const OrdersModel = require("./orders/order.model");

const typeArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolverArray = loadFilesSync(path.join(__dirname, "**/*.resolver.js"));

const schema = makeExecutableSchema({
  typeDefs: typeArray,
  resolvers: resolverArray,
  // resolvers: {
  //     Query: {
  //         products: async (parent,args, context,info)=>{
  //             console.log('loading products....');
  //             return await parent.products;
  //             return ProductsModel.getAllProducts();
  //         },
  //         orders: ()=>{
  //             return OrdersModel.getAllOrders();
  //         }
  //     },
  // },
});

const app = express();
const root = {
  products: ProductsModel.getAllProducts(),
  orders: OrdersModel.getAllOrders(),
};

async function startApolloServer() {
  const server = new ApolloServer({
    schema,
  });
  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });
  app.listen(3000, () => {
    console.log("running graphql server...");
  });
}

startApolloServer()
// app.use('/graphql',graphqlHTTP({
//     schema,
//     rootValue: root,
//     graphiql: true,
// }));
// app.listen(3000,() => {
//     console.log('running graphql server...');
// })
