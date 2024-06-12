import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

if (!localStorage.getItem('auth')) {
    localStorage.setItem('auth', '');
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



