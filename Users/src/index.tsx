import React from 'react';
import { render} from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const spa = (elementId: any) => {
    const renderElemement = document.getElementById(elementId);
    render(<App/>, renderElemement)

}

// @ts-ignore
window["mountSPA"] = spa;

// @ts-ignore
if (!(window["micro-front-end-spa-sie"])) {
    spa("root");
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
