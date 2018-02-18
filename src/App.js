import React, { Component } from 'react';
import Dashboard from './components/Dashboard.jsx'
import logo from './Pixura-logo-large_fff.png';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      cats: 'Grumpy',
      collectibles: {}
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3031/api/collectibles')
    .then(response => {
      console.log(response)
      this.setState({
        collectibles: response.data.result
      })
    })
    .catch(console.log);
  }

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
