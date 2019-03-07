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
        <main>
          <StoreFront boosterpacks={this.props.entities.boosterpacks}></StoreFront>
        </main>
      </div>
    );
  }
}

const App = connect((state) => state)(App_);

export default App;
