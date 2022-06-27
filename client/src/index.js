import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store.js';
import { AlertsContextProvider } from './components/listOfUsers/alerts/AlertMessage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AlertsContextProvider>
          <App />
        </AlertsContextProvider>

    </Provider>
);

