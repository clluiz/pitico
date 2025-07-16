import { FastifyReply, FastifyRequest } from "fastify";
import * as shortenUrlUseCase from "../../../application/use-cases/shorten-url/shorten-url.use-case.js";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { url } = request.body as { url: string };

  const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;

  if (!urlRegex.test(url)) {
    return reply.status(400).send({ message: "Invalid URL format" });
  }

  const output = await shortenUrlUseCase.execute({ originalUrl: url });

  return reply.status(201).send(output);
};
