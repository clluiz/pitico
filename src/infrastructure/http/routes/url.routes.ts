import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { create } from "../controllers/url.controller.js";
import { createUrlSchema } from "../schemas/url.schema.js";

const urlRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
): Promise<void> => {
  fastify.post("/create", { schema: createUrlSchema }, create);
};

export default urlRoutes;
