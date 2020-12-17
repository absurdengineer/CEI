import React, { Component } from 'react'
import jwt_decode from "jwt-decode"
import {Switch, Route} from 'react-router-dom'
import HomePage from './pages/Homepage/Homepage.page';
import LoginPage from './pages/Login/Login.page';
import RegisterPage from './pages/Register/Register.page';

class App extends Component {
  state = { jwt : '' ,user : {} }

  setHeader = jwt => {
    const decoded = jwt_decode(jwt)
    this.setState({jwt, user : decoded})
  }

  render() {
    console.log(this.state.user)
    return ( 
    <div className='container'>
      <h1>CEI Project</h1>
      <Switch>
        <Route path='/login' render={() => <LoginPage setHeader={this.setHeader}/>} />
        <Route path='/register' render={() => <RegisterPage setHeader={this.setHeader}/>} />
        <Route path='/' component={HomePage} />
      </Switch>
    </div> );
  }
}

export default App;