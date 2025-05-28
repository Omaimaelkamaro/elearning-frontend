import React from 'react'; 
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './components/ThemeProvider'
import "./i18n";

import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/Course/CourseContext.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>
   <ThemeProvider>
      <App />
    </ThemeProvider>
  </AuthProvider>
</React.StrictMode>
)
