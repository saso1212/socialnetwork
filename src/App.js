import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import "./App.css"
import Layout from './containers/Layout/Layout';
import Home from './containers/Home/Home';
import ProtectedRoute from './utils/ProtectedRoute/ProtectedRoute';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
          <Route exact path="/login" render={()=><h1>Login or Sign  Up</h1>}/>
          <ProtectedRoute 
          isAllowed={false}
          path="/"
          component={Home}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
