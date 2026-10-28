import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ProofPage from './ProofPage';
import '../styles/globals.css';
import './proof.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProofPage />
  </StrictMode>
);
