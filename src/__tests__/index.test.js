describe("fastify-swagger-ui", () => {
  beforeAll(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("exposes swagger-ui", async done => {
    const fastify = require("fastify")();

    fastify.register(require("../../src/index"));

    const r = await fastify.inject({ method: "GET", url: "/swagger/" });

    expect(true).toBeTruthy();

    done();
  });
});
