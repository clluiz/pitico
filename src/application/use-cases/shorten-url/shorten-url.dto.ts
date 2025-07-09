export interface ShortenUrlInputDto {
  originalUrl: string;
}

export interface ShortenUrlOutputDto {
  id: number;
  shortCode: string;
  originalUrl: string;
}
