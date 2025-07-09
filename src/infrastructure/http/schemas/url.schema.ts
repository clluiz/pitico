export const createUrlSchema = {
  body: {
    type: "object",
    required: ["url"],
    properties: {
      url: { type: "string" },
    },
  },
  querystring: {
    type: "object",
    properties: {
      value: { type: 'integer' }
    },
  },
  response: {
    201: {
      id: { type: "string" },
      shortUrl: { type: "string" },
      originalUrl: { type: "string" },
    },
  },
};
