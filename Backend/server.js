const fastify = require('fastify')({ logger: true });
// fastify.register(require('fastify-cors'), { origin: true });
// fastify.register(require('@fastify/swagger'), {
//   exposeRoute: true,
//   routePrefix: '/docs',
//   swagger: {
//     info: { title: 'fastify-api' }
//   }
// })
fastify.register(require('./routes/userRoute'));

 const start = async () => {
  try {
    fastify.listen({ port: 5000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();
