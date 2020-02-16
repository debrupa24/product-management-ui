import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {products: this.props.products, isLoading: false,catagoryName:this.props.catagoryName,selectedId:this.props.selectedId};
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
          this.setState({products: updatedProducts});
        });
      }
    

      render() {
          
        const {products, isLoading,catagoryName,selectedId} = this.state;
    
        
        const productList = products.map(product => {
            return <tr key={product.productId}>
              <td>{product.productName}</td>
              <td>{product.productDescription}</td>
              <td>{product.price}</td>
              <td>{product.currencyType}</td>
              <td>{product.createdBy}</td>
              <td>
                <ButtonGroup>
                  <Button size="sm" color="primary" tag={Link} to={"/product/updateProduct/" + product.productId}>Edit</Button>
                  <Button size="sm" color="danger" onClick={() => this.remove(product.productId)}>Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          }); 
          return (
            <div>
              <AppNavbar/>
              <Container fluid>
                <div className="float-right">
                  <Button color="success" tag={Link} to="/addproduct" selectedid={selectedId}>Add New Product</Button>
                  <Button color="link"><Link to="/">Back</Link></Button>
                </div>
                <h3>Product Details  for {catagoryName}</h3>
                <div className="table-responsive">
                <Table className="table table-hover">
                  <thead className="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Currency </th>
                    <th>Cretaed By</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                 {productList}
                  </tbody>
                 
                </Table></div>
                {JSON.stringify(products)}
              </Container>
            </div>
          );
        
          }
        
    
        
}
export default ProductList;