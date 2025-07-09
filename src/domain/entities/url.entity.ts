export class Url {
  private constructor(
    public readonly id: string,
    public readonly originalUrl: string,
    public readonly shortUrl: string,
    public readonly createdAt: Date,
  ) {}

  public static create(
    originalUrl: string,
    id?: string,
    shortUrl?: string,
  ): Url {
    const urlId = id ?? crypto.randomUUID();
    const urlShortUrl = shortUrl ?? "";
    const createdAt = new Date();
    return new Url(urlId, originalUrl, urlShortUrl, createdAt);
  }
}
