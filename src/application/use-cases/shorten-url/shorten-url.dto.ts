export interface ShortenUrlInputDto {
  originalUrl: string;
}

export interface ShortenUrlOutputDto {
  id: number;
  shortUrl: string;
  originalUrl: string;
}
