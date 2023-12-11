const fastify = require('fastify')({ logger: true });

fastify.register(require('@fastify/cors'), (instance) => {
  return (req, callback) => {
    const corsOptions = {
      origin: true
    };

    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }

    callback(null, corsOptions)
  }
})

fastify.register(require('./routes/userRoute'));

 const start = async () => {
  try {
    fastify.listen({ port: 5001 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();
