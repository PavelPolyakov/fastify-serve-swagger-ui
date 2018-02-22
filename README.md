`fastify-swagger-ui` serves [swagger UI](https://swagger.io/swagger-ui/) for your fastify instance, at the same time allowig you to inject swagger specification of your choice as default speficiation.

## install
```
npm i fastify-swagger-ui
```

## usage
During the initialisation of the plugin, you need to provide the specification which shold be served.
Specification could be either `url` or `file`. 

For the file case it's expected that you pass the absolute path to the file, given that
