import React, { Component } from 'react';
import './App.css';

class App extends Component<{name: String}> {

  componentDidMount() {

    setTimeout(_ => {
    //  this.props.onButtonClick();
      console.log('setup')
    }, 2000);
  }

  render() {
    return (
      <div className="App">
        <h1>
          Hello {this.props.name}
        </h1>
      </div>
    );
  }
}

export default App;


