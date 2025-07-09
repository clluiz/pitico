import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { defaultSchema } from "../schemas/default.schema.js";
import { redirect } from "../controllers/default.controller.js";

export const defaultRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
): Promise<void> => {
  fastify.get(
    "/:code",
    {
      schema: defaultSchema,
    },
    redirect,
  );
};

export default defaultRoutes;
