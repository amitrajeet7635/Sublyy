import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './context/authContext.jsx';
import { SettingsProvider } from './context/settingsContext.jsx';
import App from './App.jsx';
import NavbarWrapper from './components/ui/NavbarWrapper';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <SettingsProvider>
        <NavbarWrapper />
        <App />
      </SettingsProvider>
    </AuthProvider>
  </BrowserRouter>
);