import { buildServer } from './server';

const server = buildServer({ logger: true });

server.listen({ port: 8080 }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server is now listenning on ${address}`);
});
