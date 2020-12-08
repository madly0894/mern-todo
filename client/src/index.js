import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider as StoreProvider} from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from "./store";
import SnackbarProvider from "./components/SnackbarProviderComponent";

ReactDOM.render(
    <StoreProvider store={store}>
        <SnackbarProvider>
            <App />
        </SnackbarProvider>
    </StoreProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
