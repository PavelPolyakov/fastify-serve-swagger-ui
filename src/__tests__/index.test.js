describe("fastify-serve-swagger-ui", () => {
  beforeAll(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("specification => file", async done => {
    const fastify = require("fastify")();

    fastify.register(require("../../src/index"), {
      specification: {
        type: "file",
        path: "./var/examples/example.yaml"
      },
      path: "swagger-file"
    });

    const index = await fastify.inject({
      method: "GET",
      url: "/swagger-file/"
    });
    expect(index.statusCode).toBe(200);
    expect(index.payload).toMatchSnapshot();
    const specification = await fastify.inject({
      method: "GET",
      url: "/swagger-file/specification.yaml"
    });
    expect(specification.statusCode).toBe(200);
    expect(specification.payload).toMatchSnapshot();
    done();
  });

  it("specification => url", async done => {
    const fastify = require("fastify")();

    fastify.register(require("../../src/index"), {
      specification: {
        type: "url",
        url: "http://google.com"
      },
      path: "swagger-url"
    });

    const index = await fastify.inject({ method: "GET", url: "/swagger-url/" });

    expect(index.statusCode).toBe(200);
    expect(index.payload).toMatchSnapshot();

    done();
  });
});
