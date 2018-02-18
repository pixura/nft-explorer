import React, { Component } from 'react';
import Dashboard from './components/Dashboard.jsx'
import logo from './Pixura-logo-large_fff.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Pixura, motherfuckers</h1>
          <Dashboard></Dashboard>
        </header>
        <p className="App-intro">
          Non Fungible Token Explorer
        </p>
      </div>
    );
  }
}

export default App;
