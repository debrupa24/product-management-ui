import React from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import ProductList from './ProductList';

class CategoryList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [], isLoading: true, showProduct: false, catagoryName: "",
            products: {}, selectedId: "32"
        };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch('category/getCategories')
            .then(response => response.json())
            .then(data => this.setState({ categories: data, isLoading: false }));
    }

    async remove(id) {
        await fetch(`/category/deleteCategory/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedCategories = [...this.state.categories].filter(i => i.categoryId !== id);
            this.setState({ categories: updatedCategories });

        });
    }

    render() {
        const { categories, isLoading, showProduct, catagoryName, products, selectedId } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        if (showProduct) {

            return <ProductList products={products} catagoryName={catagoryName} selectedId={selectedId} />;

        }

        const categoryList = categories.map(category => {
            if (!category.updateHistory) {
                category.updateHistory = {};
                category.updateHistory.updatedBy = "testuser";
                category.updateHistory.updateComment = "";
            }
            if (!category.updatedAt) {
                category.updatedAt = new Date();
            }
            return <tr key={category.categoryId}>
                <td>{category.catagoryName}</td>
                <td>{category.catagoryDescription}</td>
                <td>
                    <Button size="sm" color="info" onClick={() => this.setState({ showProduct: true, products: category.products, catagoryName: category.catagoryName, selectedId: category.categoryId })}>
                        <span className="badge badge-light">{category.products.length}</span> Get Products >>
                    </Button>
                </td>
                <td>{category.createdBy}</td>
                <td>{category.updateHistory.updatedBy || ""}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="warning" tag={Link} to={{
                            pathname: `/updatecategory/${category.categoryId}/${JSON.stringify(category)}`
                        }}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(category.categoryId)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    <div className="float-right generaPadding">
                        <Button color="success" tag={Link} to={{
                            pathname: `/addcategory/${this.state.selectedId}`
                        }} >Add New Category</Button>
                    </div>
                    <h3 className="generaPadding">Category Details</h3>
                    <div className="table-responsive generaPadding">
                        <Table className="table table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Number of Products</th>
                                    <th>Created By</th>
                                    <th>Updated By</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryList}
                            </tbody>
                        </Table></div>
                </Container>
            </div>
        );
    }
}

export default CategoryList;