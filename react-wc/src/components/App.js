import React, { Component } from 'react';

class App extends Component {
    clicksCt = 0;

    handleClick() {
        this.clicksCt++;
        this.setState({ clicksCt: this.clicksCt });
        this.props.onAction(this.clicksCt);
    }

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = { clicksCt: this.clicksCt }; 
    }

    render() {
        return (
            <div className="App">
                <style dangerouslySetInnerHTML={{ __html: `h1 { color: red }`}} />
                <h1>Im inside header</h1>
                <button onClick={this.handleClick}>
                    <slot>{this.props.label}</slot>
                    &nbsp;{this.state.clicksCt}
                </button>
            </div>
        );
    }
}

export default App;