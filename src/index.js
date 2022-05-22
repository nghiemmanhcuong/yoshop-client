import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter,HashRouter} from 'react-router-dom';
import StoreProvider from './store';

import './scss/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HashRouter>
            <StoreProvider>
                <App />
            </StoreProvider>
        </HashRouter>
    </React.StrictMode>,
);
