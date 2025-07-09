import { FastifyInstance } from "fastify";
import urlRoutes from "./url.routes.js";
import defaultRoutes from "./default.routes.js";

export default async function (fastify: FastifyInstance) {
  fastify.register(urlRoutes, { prefix: "/api/url" });
  fastify.register(defaultRoutes, { prefix: "/" });
}
