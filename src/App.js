import React, { Component } from 'react';
import './App.css';
import SnakeReactComponent from './snake/snakeReactComponent.js';

class App extends Component {

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Enjoy!</h1>
        </header>
        <main className='App-main'>
          <SnakeReactComponent />
        </main>
      </div>
    );
  };
};

export default App;
