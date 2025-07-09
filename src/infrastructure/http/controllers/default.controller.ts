import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../db/index.js";

export const redirect = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { code } = request.params as { code: string };

  const result = await db("urls").where("short_code", "=", code);

  const originalUrl: string = result[0].original_url;

  reply.redirect(originalUrl);
};
