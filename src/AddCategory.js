import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class AddCategory extends Component {
    emptyItem = {
        productName: '',
        productDesc: '',
        currency: '',
        price: '',
        createdAt: '',
        createdBy: ''
      };
    
      constructor(props) {
        super(props);
        this.state = {
          item: this.emptyItem,
          selectedid:this.props.selectedid
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
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
      }
    
      async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        await fetch(`/product/addProduct/${value}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item),
        });
        this.props.history.push('/categories');
      }
    
      render() {
        const {item,selectedid} = this.state;
        const title = <h2>Add Product {selectedid}</h2>;
    
        return <div>
          <AppNavbar/>
          <Container>
            {title}
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="name">Product Name</Label>
                <Input type="text" name="name" id="name" value={item.productName || ''}
                       onChange={this.handleChange} autoComplete="name"/>
              </FormGroup>
              <FormGroup>
                <Label for="address">Product Description</Label>
                <Input type="text" name="desc" id="desc" value={item.productDesc || ''}
                       onChange={this.handleChange} autoComplete="address-level1"/>
              </FormGroup>
              <FormGroup>
                <Label for="city">Price</Label>
                <Input type="text" name="price" id="price" value={item.price|| ''}
                       onChange={this.handleChange} autoComplete="address-level1"/>
              </FormGroup>
              <FormGroup>
                <Label for="city">Currency</Label>
                <Input type="text" name="currency" id="currency" value={item.currency|| ''}
                       onChange={this.handleChange} autoComplete="address-level1"/>
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