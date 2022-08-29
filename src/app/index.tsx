import { App } from './app';
import { hydrateRoot } from 'react-dom/client';
const container = document.getElementById('app-root');

if (process.env.NODE_ENV !== 'production') {
  const { worker } = require('test/mocks/browser');
  worker.start();
}

hydrateRoot(container!, <App />);
