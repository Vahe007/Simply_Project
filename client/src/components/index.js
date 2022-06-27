import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './UsersPagination';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './app/store.js';
import UsersContextProvider from './features/users/UsersContextProvider';
import { AlertsContextProvider } from './components/alerts/AlertMessage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <Provider store={store}>
    <UsersContextProvider>
      <AlertsContextProvider>
        <App />
      </AlertsContextProvider>
    </UsersContextProvider>
  </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
