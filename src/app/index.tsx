import { App } from './app';
import { hydrateRoot } from 'react-dom/client';
const container = document.getElementById('app-root');
hydrateRoot(container!, <App />);
