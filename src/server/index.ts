import { server } from './server';

server.listen({ port: 8081 }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server is now listenning on ${address}`);
});
