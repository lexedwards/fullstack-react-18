import fastify from 'fastify';

import { resolve } from 'path';
import { renderToPipeableStream } from 'react-dom/server';
import { App } from 'app/app';
import { htmlTags } from './htmlTags';
import { FilledContext } from 'react-helmet-async';

interface PageContext {
  head: Partial<FilledContext>;
  location: string;
}

const server = fastify({
  logger: true,
});

server.register(import('@fastify/static'), {
  root: resolve(__dirname, '..', 'app'),
  prefix: '/app',
});

server.get('/*', (request, reply) => {
  const pageContext: PageContext = {
    head: {},
    location: request.url,
  };
  let renderedTags: ReturnType<typeof htmlTags>;
  const markup = renderToPipeableStream(
    <App head={pageContext.head} location={pageContext.location} />,
    {
      onShellReady() {
        renderedTags = htmlTags(pageContext.head);
        reply.status(200);
        reply.header(`Content-type`, `text/html`);
        reply.raw.write(`${renderedTags?.head}<div id="app-root">`);
        markup.pipe(reply.raw);
      },
      onShellError(err) {
        reply.status(500);
        server.log.error(err);
      },
      onAllReady() {
        reply.raw.write(`</div>${renderedTags?.foot}`);
      },
    }
  );
});

export { server };
