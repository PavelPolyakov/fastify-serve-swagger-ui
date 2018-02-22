const fp = require("fastify-plugin");
const swaggerUiAssetPath = require("swagger-ui-dist").getAbsoluteFSPath();
const fs = require("fs");
const path = require("path");
const assert = require("assert");

module.exports = fp(function(fastify, opts, next) {
  // assertions, so we validate the input
  assert(opts.specification, "specification is missing in the module options");
  assert(opts.specification.type, "specification.type is missing");
  assert(
    typeof opts.specification.type === "string",
    "specification.type is not a string"
  );
  opts.specification.type = opts.specification.type.toLowerCase();
  assert(
    ["file", "url"].includes(opts.specification.type),
    "specification.type is incorrect, should be any from ['file', 'url']"
  );
  assert(opts.path, "path is missing in the module options");

  const files = {
    index: fs.readFileSync(`${swaggerUiAssetPath}/index.html`, "utf8").replace(
      /url: "(.*)"/,
      `url: "${(() => {
        let result;
        switch (opts.specification.type) {
          case "file":
            result = `/${opts.path}/specification${path.extname(
              opts.specification.path
            )}`;
            break;
          case "url":
            result = opts.specification.url;
            break;
        }

        return result;
      })()}"`
    )
  };

  // if specification type is file - prepare the file content and declare the correspondent route
  if (opts.specification.type === "file") {
    files.specification = fs.readFileSync(
      `${process.cwd()}/${opts.specification.path}`,
      "utf8"
    );

    fastify.get(
      `/${opts.path}/specification${path.extname(opts.specification.path)}`,
      (request, reply) => {
        reply.send(files.specification);
      }
    );
  }

  // server swagger-ui with the help of fastify-static
  fastify.register(require("fastify-static"), {
    root: swaggerUiAssetPath,
    prefix: `/${opts.path}/`
  });

  // hijak swagger index.html response
  fastify.addHook("onSend", (request, reply, payload, next) => {
    console.log("request");
    console.log(request.raw.originalUrl);

    if (
      request.raw.originalUrl === `/${opts.path}/` ||
      request.raw.originalUri === `/${opts.path}/index.html`
    ) {
      console.log("MATCH!!");
      reply.header("Content-Type", "text/html; charset=UTF-8");
      payload = files.index;
    }
    next(null, payload);
  });

  next();
});
