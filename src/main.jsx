import ReactDOM from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// cheecking for extension or browser
const isExtension = () => {
  return (
    typeof window !== 'undefined' &&
    typeof window.chrome !== 'undefined' &&
    window.chrome.runtime &&
    window.chrome.runtime.id
  );
};

const Router = isExtension() ? MemoryRouter : BrowserRouter;
const rootElement = document.getElementById('root');

// Create a root with React 18's createRoot
const root = ReactDOM.createRoot(rootElement);

// Render the app within the appropriate Router
root.render(
  <Router>
    <App />
  </Router>
);
