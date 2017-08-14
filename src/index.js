import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

class App extends React.Component{
  render(){
    return(
      <h2>App</h2>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
