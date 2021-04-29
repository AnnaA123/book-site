import { AuthenticationError } from "apollo-server-express";
import { login } from "../passport/auth.js";

export default {
  Query: {
    login: async (parent, args, { req, res }) => {
      req.body = args;
      try {
        const loginRes = await login(req, res);
        return {
          id: loginRes.user.id,
          username: loginRes.user.username,
          token: loginRes.token,
        };
      } catch (e) {
        throw new AuthenticationError(e.message);
      }
    },
  },
};
