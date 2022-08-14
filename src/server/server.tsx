import fastify from 'fastify';
import { readFile, createReadStream } from 'fs';
import { resolve } from 'path';
import { renderToPipeableStream } from 'react-dom/server';
import { App } from 'app/app';

const server = fastify({
  logger: true,
});

server.get('/main.js', (_req, reply) => {
  reply.send(createReadStream(resolve(__dirname, '..', 'app', 'main.js')));
});

server.get('/*', (request, reply) => {
  readFile(
    resolve(__dirname, '..', 'app', 'index.html'),
    'utf-8',
    (err, staticHTML) => {
      if (err) {
        reply.status(500);
        server.log.error(err);
      }
      const [start, end] = staticHTML.split(`<div id="app-root"></div>`);
      const markup = renderToPipeableStream(<App />, {
        onShellReady() {
          reply.status(200);
          reply.header(`Content-type`, `text/html`);
          reply.raw.write(`${start}<div id="app-root">`);
          markup.pipe(reply.raw);
        },
        onShellError(err) {
          reply.status(500);
          server.log.error(err);
        },
        onAllReady() {
          reply.raw.write(`</div>${end}`);
        },
      });
    }
  );
});

export { server };
