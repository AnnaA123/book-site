import { AuthenticationError } from "apollo-server-express";
//import { login } from "../controllers/auth.js";

export default {
  Query: {
    login: async (parent, args, { req, res }) => {
      // inject username and password to req.body for passport
      req.body = args;
      try {
        //const authResponse = await login(req, res);
        return {
          // ...authResponse.user would work here
          /*
          id: authResponse.user.id,
          username: authResponse.user.username,
          token: authResponse.token,
          */
        };
      } catch (e) {
        throw new AuthenticationError(e.message);
      }
    },
  },
};
