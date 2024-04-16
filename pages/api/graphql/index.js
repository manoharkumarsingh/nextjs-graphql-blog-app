import typeDefs from "./schemaGql";
import mongoose from "mongoose";
import { ConnectOptions } from "mongoose";
import resolvers from "./resolvers";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import "../../../models/Quotes";
import "../../../models/User";
import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req) => {
    const { authorization } = req.headers;
    if (authorization) {
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
      return { userId };
    }
    return {};
  },
});

// export default startServerAndCreateNextHandler(server);
