import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Opcional, si tenés estilos
import './styles.css'; // Asegúrate de que este archivo exista y tenga los estilos necesarios

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);