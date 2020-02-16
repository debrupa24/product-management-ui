import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ProductList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { products: this.props.products, isLoading: false, catagoryName: this.props.catagoryName, selectedId: this.props.selectedId };
    this.remove = this.remove.bind(this);
  }


  async remove(id) {
    await fetch(`/product/deleteProduct/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedProducts = [...this.state.products].filter(i => i.productId !== id);
      this.setState({ products: updatedProducts });
    });
  }


  render() {

    const { products, isLoading, catagoryName, selectedId } = this.state;


    const productList = products.map(product => {
      if(!product.updateHistory){
        product.updateHistory={};
        product.updateHistory.updatedBy="testuser";
        product.updateHistory.updateComment = "";
      }
      if(!product.updatedAt){
        product.updatedAt=new Date();
      }
      
      return <tr key={product.productId}>
        <td>{product.productName}</td>
        <td>{product.productDescription}</td>
        <td>{product.price}</td>
        <td>{product.currencyType}</td>
        <td>{product.createdBy}</td>
        <td>{product.updatedBy||""}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="warning" tag={Link} to={{
              pathname: `/updateproduct/${this.state.selectedId}/${JSON.stringify(product)}`
            }}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(product.productId)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to={{
              pathname: `/addproduct/${this.state.selectedId}`
            }} >Add New Product</Button>

            <Button color="link"><Link to="/">Back</Link></Button>
          </div>
          <h3  className="generaPadding">Product Details  for {catagoryName}</h3>
          <div className="table-responsive generaPadding">
            <Table className="table table-hover">
              <thead className="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Currency </th>
                  <th>Cretaed By</th>
                  <th>Updated By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {productList}
              </tbody>

            </Table></div>
        </Container>
      </div>
    );

  }



}
export default ProductList;