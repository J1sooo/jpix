import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import {RecoilRoot} from "recoil";


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  // <React.StrictMode>
      <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
      </RecoilRoot>
  // </React.StrictMode>,
);