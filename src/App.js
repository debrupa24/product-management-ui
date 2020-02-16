import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CategoryList from './CategoryList';
import AddCategory from './AddCategory';


class App extends Component {
  state = {
    isLoading: true,
    groups: []
  };

  render() {
    return (
      <Router>
      <Switch>
        <Route path='/' exact={true} component={Home}/>
        <Route path='/categories' exact={true} component={CategoryList}/>
        <Route path='/addcategory/:selectedId' exact={true} component={AddCategory}/>
      </Switch>
    </Router>
    );
  }
}

export default App;