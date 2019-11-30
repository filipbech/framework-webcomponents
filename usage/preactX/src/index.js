import { Component } from 'preact';


export default class App extends Component {
	framework = 'Preact';
	audience = { audience: 'World' };
	handleEvent = (evt) => {
		alert('Hello' + evt.detail);
	}
	render() {
		return (
			<div>
				<my-element
					audienceProp={this.audience}
					framework-attr={this.framework}
					oncustomEvent={this.handleEvent}
				></my-element>
			</div>
		);
	}
}


