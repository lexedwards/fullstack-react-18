import { FastifyError, FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import { FilledContext } from 'react-helmet-async';
import { renderToPipeableStream } from 'react-dom/server';
import { App } from 'app/app';
import { htmlTags } from './htmlTags';

interface PageContext {
  head: Partial<FilledContext>;
  location: string;
}

function pageRenderCallback(
  server: FastifyInstance,
  _options: FastifyPluginOptions,
  next: (error?: FastifyError) => void
): void {
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

  next();
}

export const pageRender = fp(pageRenderCallback);
