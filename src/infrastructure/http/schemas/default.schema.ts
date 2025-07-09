export const defaultSchema = {
  params: {
    type: "object",
    properties: {
      code: { type: "string" },
    },
    required: ["code"],
  },
  response: {
    302: {
      description: "Redirect to the original URL",
      type: "null",
    },
    404: {
      description: "Error: Not Found",
      type: "object",
      properties: {
        message: { type: "string" },
        error: { type: "string" },
        statusCode: { type: "number" },
      },
    },
  },
};
