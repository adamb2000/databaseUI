import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import Store from './state/Store';




createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <App/>
  </Provider>

);

