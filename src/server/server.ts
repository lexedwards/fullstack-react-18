import fastify, { FastifyServerOptions } from 'fastify';
import { resolve } from 'path';
import { pageRender } from './pageRender';

const buildServer = (opts?: FastifyServerOptions) => {
  const server = fastify(opts);

  server.register(import('@fastify/static'), {
    root: resolve(__dirname, '..', 'public'),
    prefix: '/public',
  });

  server.register(pageRender);

  return server;
};

export { buildServer };
