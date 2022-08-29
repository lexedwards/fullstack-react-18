/**
 * @jest-environment ./test/customEnv
 * @jest-environment-options {"fixture": "homepage.html"}
 */

import { hydrateRoot } from 'react-dom/client';
import { App } from 'app/app';

describe('Homepage', () => {
  beforeEach(() => {
    const container = window.document.getElementById('app-root');
    hydrateRoot(container!, <App />);
  });
  it('renders', () => {
    expect(window.document.getElementById('app-root')).toBeDefined();
  });
});
