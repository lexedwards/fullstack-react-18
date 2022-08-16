import { StrictMode } from 'react';
import { HelmetProvider, FilledContext } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { HomePage } from './pages';

interface AppProps {
  head?: Partial<FilledContext>;
  location?: string;
}

export function App({ head = {}, location = '/' }: AppProps) {
  const Router = typeof window !== 'undefined' ? BrowserRouter : StaticRouter;
  return (
    <StrictMode>
      <Router location={location}>
        <HelmetProvider context={head || {}}>
          <Routes>
            <Route path='/' element={<HomePage />} />
          </Routes>
        </HelmetProvider>
      </Router>
    </StrictMode>
  );
}
