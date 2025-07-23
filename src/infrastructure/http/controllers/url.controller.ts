import { FastifyReply, FastifyRequest } from "fastify";
import * as shortenUrlUseCase from "../../../application/use-cases/shorten-url/shorten-url.use-case.js";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { url } = request.body as { url: string };
    const output = await shortenUrlUseCase.execute({ originalUrl: url });
    return reply.status(201).send(output);
  } catch (error) {
    return reply.status(500).send({ message: "Internal server error" });
  }
};
