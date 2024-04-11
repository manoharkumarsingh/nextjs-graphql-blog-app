import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import mongoose, { ConnectOptions } from "mongoose";
import jwt from "jsonwebtoken";
import typeDefs from "./schemaGql";
import resolvers from "./resolvers";
import "../../../models/Quotes";
import "../../../models/User";
import { NextApiRequest } from "next";

mongoose.connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});

// Define the custom context function type
type MyContext = { userId?: string };

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  context: ({ req }: { req: NextApiRequest }) => {
    const { authorization } = req.headers;
    if (authorization) {
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET!) as {
        userId: string;
      };
      return { userId };
    }
    return {};
  },
});

export default startServerAndCreateNextHandler(server);
