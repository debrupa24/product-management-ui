import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CategoryList from './CategoryList';
import AddCategory from './AddCategory';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import UpdateCategory from './UpdateCategory';

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
        <Route path='/addproduct/:selectedId' exact={true} component={AddProduct}/>
        <Route path='/updateproduct/:selectedId/:product' exact={true} component={UpdateProduct}/>
        <Route path='/updatecategory/:selectedId/:category' exact={true} component={UpdateCategory}/>
      </Switch>
    </Router>
    );
  }
}

export default App;