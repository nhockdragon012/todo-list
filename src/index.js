import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import {store, persistor} from './Redux/store'
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render (
  <Provider store ={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
  
)

reportWebVitals();
