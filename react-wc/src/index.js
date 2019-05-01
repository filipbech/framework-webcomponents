import App from './components/App';

import { register } from './web-react-components';

register(App, 'custom-button', ['label'], {
    onAction: e => new CustomEvent('action', { detail: e, bubbles: true })
});
