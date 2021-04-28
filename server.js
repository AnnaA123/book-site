import { ApolloServer } from "apollo-server-express";
import schemas from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import express from "express";
import dotenv from "dotenv";
import connectMongo from "./db/db.js";
// import { checkAuth } from "./passport/auth.js";
// import localhost from "./security/localhost.js";
// import production from "./security/production.js";
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
          // const user = await checkAuth(req, res);
          const user = { username: "foo", password: "bar" };
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
    /*
    process.env.NODE_ENV = process.env.NODE_ENV || "production";
    if (process.env.NODE_ENV === "production") {
      production(app, 3000);
    } else {
      production(app, 3000);
      // localhost(app, 8000, 3000);
    }
*/

    app.listen({ port: 3000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:3000${server.graphqlPath}`
      )
    );

    /*
    http
      .createServer((req, res) => {
        res.writeHead(301, { Location: "https://localhost:8000" + req.url });
        res.end();
      })
      .listen(3000);
/*
    https.createServer(options, app).listen(8000);
    */
  } catch (e) {
    console.log("server error: " + e.message);
  }
})();
