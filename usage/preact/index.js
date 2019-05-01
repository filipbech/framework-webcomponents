import { Component } from 'preact';

const s = document.createElement('script');
s.src="my-element.js";
document.body.appendChild(s);

export default class App extends Component {

	render() {
		const framework = 'React';
		const audience = { audience: 'World' };
		const handleEvent = (evt) => {
			alert('Hello' + evt.detail);
		}
		return (
			<div>
				<my-element
					audienceprop={audience}
					framework-attr={framework}
					oncustomEvent={handleEvent}
				></my-element>
			</div>
		);
	}
}