const fastify = require("fastify")();
fastify.register(require("../../src/index"), {
//   specification: {
//     type: "file",
//     path: "./var/examples/example.yaml"
//   },
  specification: {
    type: "url",
    url: "http://petstore.swagger.io/v2/swagger.json"
  },
  path: "swagger"
});

const start = async () => {
  try {
    await fastify.listen(3000);

    console.log(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
