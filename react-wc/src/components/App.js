import React, { Component } from 'react';
// import './App.css';

class App extends Component {

    componentDidMount() {

        setTimeout(_ => {
            this.props.onButtonClick({something:true});
        }, 2000);
    }

    render() {
        return (
            <div className="App">
                <h1>
                    Hello {this.props.name}
                </h1>
                {this.children}
            </div>
        );
    }
}

export default App;