import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { register, convert } from 'web-react-components';
const Ele = convert(App);

console.log(Ele);
// register(App, 'my-component', ['name'], {
//     onButtonClick: e => new Event('buttonclick', { bubbles: true })
// })


class MyTest {
    static prop = '123';
}

console.log(MyTest);

ReactDOM.render(<App name="Filip"/>, document.getElementById('root'));

