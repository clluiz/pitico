import { Url } from "../../domain/entities/url.entity.js";
import { UrlRepository } from "../../domain/repositories/url.repository.js";

export class KnexUrlRepository implements UrlRepository {
  constructor() {}

  public async save(url: Url): Promise<void> {}

  public async findByOriginalUrl(originalUrl: string): Promise<Url | null> {
    // const url = await this.prisma.url.findUnique({
    //   where: { originalUrl },
    // });

    // if (!url) {
    //   return null;
    // }

    // return new Url(url.id, url.originalUrl, url.shortUrl, url.createdAt);
    return Url.create("", "", "");
  }

  public async findById(id: string): Promise<Url | null> {
    //   const url = await this.prisma.url.findUnique({
    //     where: { id },
    //   });

    //   if (!url) {
    //     return null;
    //   }

    //   return new Url(url.id, url.originalUrl, url.shortUrl, url.createdAt);
    // }
    return Url.create("", "", "")
  }
}
