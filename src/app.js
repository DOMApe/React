import './styles.sass';


import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {


  render() {
    return (
      <div className="window">
        <div className="jumbo">
          <div className="logo"></div>
          <h1>React</h1>
          <p>by DOMApe<span>&#x1F34C;</span></p>
        </div>
        <div className="clouds">
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
