import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function localContactFunction() {
  return {
    name: 'local-contact-function',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (request.url?.split('?')[0] !== '/.netlify/functions/contact') return next();
        if (request.method !== 'POST') {
          response.writeHead(405, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ error: 'Use POST to send a message.' }));
          return;
        }

        try {
          const chunks = [];
          let size = 0;
          for await (const chunk of request) {
            size += chunk.length;
            if (size > 16_384) {
              response.writeHead(413, { 'Content-Type': 'application/json' });
              response.end(JSON.stringify({ error: 'The message is too large.' }));
              return;
            }
            chunks.push(chunk);
          }
          const body = Buffer.concat(chunks).toString('utf8');
          const { handler } = await import('./netlify/functions/contact.mjs');
          const result = await handler({ httpMethod: request.method, body });
          response.writeHead(result.statusCode, result.headers);
          response.end(result.body);
        } catch (error) {
          server.config.logger.error('Local contact function failed.', { error });
          response.writeHead(500, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ error: 'The message could not be processed.' }));
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) process.env[key] = value;
  }
  return { plugins: [react(), localContactFunction()] };
});
