import React from 'react';
import './my-element.js';

function App() {

  const handleEvent = evt => {
      alert('Hello' + evt.detail);
  }

  const framework = 'React';
  const audience = { audience: 'World' };

  return (
    <div className="App">
      <my-element 
        audienceProp={audience}
        framework-attr={framework}
        onCustomEvent={handleEvent}
      ></my-element>
    </div>
  );
}

export default App;
