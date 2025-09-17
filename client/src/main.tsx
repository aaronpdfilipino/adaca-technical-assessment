import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import DashboardPage from './features/dashboard/DashboardPage.tsx';
import { client } from './graphql/client.ts';
import { ApolloProvider } from '@apollo/client/react';
import NotFoundPage from './features/errors/NotFoundPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<DashboardPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
);
