import { Url } from "../entities/url.entity.js";

export interface UrlRepository {
  save(url: Url): Promise<void>;
  findByOriginalUrl(originalUrl: string): Promise<Url | null>;
  findById(id: string): Promise<Url | null>;
}
