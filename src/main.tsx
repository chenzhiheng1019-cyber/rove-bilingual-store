import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './style.css';
const base=import.meta.env.BASE_URL.replace(/\/$/,'');
// GitHub Pages sends deep links through 404.html, then back to the app root.
const route=new URLSearchParams(window.location.search).get('__rove_route');
if(route?.startsWith('/')&&!route.startsWith('//')){
 window.history.replaceState(null,'',base+route);
}
createRoot(document.getElementById('root')!).render(
 <React.StrictMode><BrowserRouter basename={base||undefined}><App/></BrowserRouter></React.StrictMode>
);
