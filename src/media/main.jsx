import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MediaPage from './MediaPage';
import '../styles/globals.css';
import './media.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MediaPage />
  </StrictMode>
);
