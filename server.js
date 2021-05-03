import { ApolloServer } from "apollo-server-express";
import schemas from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import express from "express";
import dotenv from "dotenv";
import connectMongo from "./db/db.js";
import { checkAuth } from "./passport/auth.js";
// import helmet from "helmet";

dotenv.config();

(async () => {
  try {
    const conn = await connectMongo();
    if (conn) {
      console.log("Connected succesfully.");
    }

    const server = new ApolloServer({
      typeDefs: schemas,
      resolvers,
      context: async ({ req, res }) => {
        if (req) {
          const user = await checkAuth(req, res);
          return {
            req,
            res,
            user,
          };
        }
      },
    });

    const app = express();
    // app.use(helmet());
    server.applyMiddleware({ app });

    app.listen({ port: 8000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:8000${server.graphqlPath}`
      )
    );
  } catch (e) {
    console.log("server error: " + e.message);
  }
})();
