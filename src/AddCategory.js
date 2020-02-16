import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class AddCategory extends React.Component {
  emptyItem = {
    catagoryName: '',
    catagoryDescription: '',
    createdAt: new Date(),
    createdBy: 'testuser'
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {

  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    item[name] = value;

    console.log(JSON.stringify(item));
    await fetch(`/category/addCategory`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    }).then((resp) => {
      console.log("converting to json: "+resp.ok+" "+resp.status)
      return resp.json();
        
    })// Transform the data into json
    .then(data=>{
      alert(data.message);
      this.props.history.push('/categories');
    })



  }

  render() {
    const { item } = this.state;
    const title = <h2>Add Category</h2>;

    return <div>
      <AppNavbar />
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="catagoryName">Category Name</Label>
            <Input type="text" name="catagoryName" id="catagoryName" value={item.catagoryName || ''}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="catagoryDescription">Category Description</Label>
            <Input type="text" name="catagoryDescription" id="catagoryDescription" value={item.catagoryDescription || ''}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="createdBy">Created By</Label>
            <Input type="text" name="createdBy" id="createdBy" value={item.createdBy || ''}
              disabled />
          </FormGroup>

          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/groups">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}


export default AddCategory;