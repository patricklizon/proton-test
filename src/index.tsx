import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './colors.css';
import App from './App';
import seed from './seed.json';

const passwords = window.localStorage.getItem('passwords');

if (passwords === null) {
    window.localStorage.setItem('passwords', JSON.stringify(seed));
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
