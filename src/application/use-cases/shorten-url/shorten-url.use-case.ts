import { ShortenUrlInputDto, ShortenUrlOutputDto } from "./shorten-url.dto.js";
import { Url } from "../../../domain/entities/url.entity.js";
import { UrlRepository } from "../../../domain/repositories/url.repository.js";
import { KnexUrlRepository } from "../../../infrastructure/repositories/knex-url.repository.js";
import { encodeInBase62 } from "../../../common/url.js";
import { db } from "../../../infrastructure/db/index.js";

const urlRepository: UrlRepository = new KnexUrlRepository();

export async function execute(
  input: ShortenUrlInputDto,
): Promise<ShortenUrlOutputDto> {
  const { originalUrl } = input;

  const trx = await db.transaction();
  let shortCode: string;
  let urlId: number;

  try {
    const result = await trx.raw(
      `INSERT INTO urls (original_url, created_at) VALUES ('${originalUrl}', NOW()) RETURNING id;`,
    );

    urlId = result.rows[0].id;
    shortCode = encodeInBase62(urlId);

    await trx("urls").where("id", "=", urlId).update({
      short_code: shortCode,
    });

    await trx.commit();
  } catch (error) {
    await trx.rollback();
    throw error;
  } 
  
  return {
    id: urlId,
    originalUrl,
    shortCode,
  };
}
