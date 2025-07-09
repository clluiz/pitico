import Fastify, { FastifyInstance } from "fastify";
import routes from "./infrastructure/http/routes/index.js";
import fastifyEnv from "@fastify/env";
import fastifyUserAgent from "fastify-user-agent";
import cors from "@fastify/cors";
import fastifyFormbody from "@fastify/formbody";
import swagger from "./infrastructure/plugins/swagger.js";
import swaggerUI from "./infrastructure/plugins/swaggerUI.js";

const schema = {
  type: "object",
  required: ["PORT", "DATABASE_URL"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
    DATABASE_URL: {
      type: "string",
    },
  },
};

const options = {
  confKey: "config",
  schema: schema,
  dotenv: true,
};

const server: FastifyInstance = Fastify({});

await server.register(fastifyEnv, options);
server.register(fastifyFormbody);
server.register(swagger);
server.register(swaggerUI);
server.register(fastifyUserAgent);
server.register(cors, {
  origin: "*",
});

server.register(routes);

const start = async () => {
  try {
    await server.listen({ port: server.config.PORT, host: "0.0.0.0" });
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`Server running on port ${port}`);
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
};

start();
