import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="jumbotron">
            <h1 className="display-4">Hello!</h1>
            <p className="lead">This is a demo project for CRUD operation using spring boot and reactjs</p>
            <hr className="my-4"></hr>
            <p>Click on the below button to get the details</p>
            <Button color="link"><Link to="/categories">Get Categories</Link></Button>
          </div>

        </Container>
      </div>
    );
  }
}

export default Home;