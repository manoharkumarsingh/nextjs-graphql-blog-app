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

interface MyContext {
  userId?: string;
}

const context = ({ req }: { req: NextApiRequest }): MyContext => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1]; // Extract the token from the Authorization header
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    const userId = decodedToken.userId;
    return { userId }; // Pass userId in the context
  }
  return {}; // Return an empty object if there's no authorization header
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
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

// export default startServerAndCreateNextHandler(server);
