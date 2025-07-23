export const createUrlSchema = {
  body: {
    type: "object",
    required: ["url"],
    properties: {
      url: {
        type: "string",
        pattern:
          "^(https?:\\/\\/)?([\\w.-]+)\\.([a-z\\.]{2,6})([\\/\\w\\.-]*)*\\/?$",
      },
    },
  },
  querystring: {
    type: "object",
    properties: {
      value: { type: "integer" },
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
