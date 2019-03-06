import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { State } from '../../store/types';
import { StoreFront } from '../Store/Store';
import { connect } from 'react-redux';


function isState(state: any): state is State {
  return state instanceof Object && state.hasOwnProperty('entities');
}

class App_ extends Component {
  render() {
    console.log(this.props);
    if(!isState(this.props)){
      return <div className="App"><p>Redux state is missing</p></div>
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload. Bonjour! Je m'appelle {this.props.entities.user.name}.
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
        <main>
          <StoreFront boosterpacks={this.props.entities.boosterpacks}></StoreFront>
        </main>
      </div>
    );
  }
}

const App = connect((state) => state)(App_);

export default App;
