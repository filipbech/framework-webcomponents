import App from './components/App';

import { register } from './web-react-components';

register(App, 'my-component', ['name'], {
    onButtonClick: e => new CustomEvent('buttonclick', { detail: e, bubbles: true })
});
