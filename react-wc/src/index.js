import React from 'react';
//import ReactDOM from 'react-dom';
import App from './App';
import { register } from 'web-react-components';

register(App, 'my-component', ['name'], {
    onButtonClick: e => new Event('buttonclick', { bubbles: true })
})
