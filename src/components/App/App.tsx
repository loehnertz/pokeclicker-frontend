import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { State } from '../../store/types';

class App extends Component<{state: State}> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload. Bonjour! Je m'appelle {this.props.state.entities.user.name}.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
