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
                <style dangerouslySetInnerHTML={{ __html: `h1 { color: red }`}} />
                <h1>
                    Hello {this.props.name}
                </h1>
                {this.props.children}
            </div>
        );
    }
}

export default App;