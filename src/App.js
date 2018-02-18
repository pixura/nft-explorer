import React, { Component } from 'react';
import Dashboard from './components/Dashboard.jsx'
import logo from './Pixura-logo-large_fff.png';
import './App.css';
import axios from 'axios';
import getWeb3 from './utils/getWeb3'
import PixuraContract from './abis/contracts/PIXURA.json'
let pixuraInstance;


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cats: 'Grumpy',
      collectibles: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3031/api/collectibles')
    .then(response => {
      this.setState({
        collectibles: response.data.result
      })
    })
    .catch(console.log);
    this.initSmartContract();
  }

  initSmartContract() {

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      const contract = require('truffle-contract')
      const pixura = contract(PixuraContract)
      pixura.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
      console.log(error, accounts)
      pixura.deployed().then((instance) => {
        pixuraInstance = instance;
        console.log('we have a pixura instance', pixuraInstance)

        // Stores a given value, 5 by default.
        //return simpleStorageInstance.set(10, {from: accounts[0]})
      })
      // .then((result) => {
      //
      // })
      // .catch(console.log)
    })
    .catch(() => {
      alert('Do you have web3?!?!')
      console.log('Error finding web3.')
    })
    })
  }

  handleAddToken() {
    alert('we can ads tokenz?');
  }

  render() {
    // console.log(this.state)
    // const collectibles = this.state.collectibles;
    // console.log(collectibles)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Non-fungible token explorer</h1>
          <button onClick={this.handleAddToken}>Herro Meta Marsk?</button>
          <Dashboard collectibles={ this.state.collectibles }></Dashboard>
        </header>
      </div>
    );
  }
}

export default App;
