import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import IndustryPage from './IndustryPage';
import '../styles/globals.css';
import './industry.css';

// Each industry's HTML entry (e.g. landscaping/index.html) calls this with
// its own content module.
export function mountIndustryPage(content) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <IndustryPage content={content} />
    </StrictMode>
  );
}
