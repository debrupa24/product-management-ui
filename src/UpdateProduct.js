import React from 'react';

import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class UpdateProduct extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            item: JSON.parse(props.match.params.product),
            selectedId: props.match.params.selectedId,
            rates: {},
            isUpdated: false,
            products: props.match.params.products,
            currencies: [],
            priceInEuro: 0,
            selectedCurrency: 'EUR'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
     
        console.log("item :"+JSON.stringify(this.state.item));
        fetch('http://data.fixer.io/api/latest?access_key=b4ebb57e787cb999372f11c861df2648')
            .then(response => response.json())
            .then(data => {
                const currencies = Object.keys(data.rates);
                console.log('currencies :' + currencies);
                this.setState({ currencies: currencies, rates: data.rates })
            });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(value);

        let item = { ...this.state.item };

        item[name] = value;
        if (name === 'currencyType') {
            this.setState({ selectedCurrency: value })
            const rate = this.state.rates[value];

            const priceInEuro = item['priceInEuro'];
            item['price'] = parseFloat(priceInEuro) * parseFloat(rate);

        }
        if (name === 'priceInEuro') {
            this.setState({ priceInEuro: value });
            item['price'] = parseFloat(value) * parseFloat(this.state.rates[this.state.selectedCurrency]);
        }
        if(name === 'updateComment'){
            item.updateHistory.updateComment=value;
        }
        this.setState({ item });

    }

    async handleSubmit(event) {
        event.preventDefault();
        const { item } = this.state;
        console.log(JSON.stringify(item));
        await fetch(`/product/updateProduct`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then(() => {
            this.setState({ isUpdated: true });
            alert("updated successfully");
            this.props.history.push('/categories');
        });;

    }

    render() {
        const { item, isUpdated, currencies, priceInEuro, selectedCurrency } = this.state;
/* 
        if (isUpdated) {
            return (
                alert("Updated Successfully!!")
            )

        } */

        const currency = currencies.map(c => {
            return <option key={c}>{c}</option>
        });
        const title = <h2>Update Product </h2>;

        return <div>
            <AppNavbar />
            <Container>
            <h3  className="formPadding">{title}</h3>
                <Form onSubmit={this.handleSubmit} className="formPadding">
                    <FormGroup>
                        <Label for="productName">Product Name</Label>
                        <Input type="text" name="productName" id="productName" value={item.productName || ''}
                            disabled />
                    </FormGroup>
                    <FormGroup>
                        <Label for="productDescription">Product Description</Label>
                        <Input type="textarea" name="productDescription" id="productDescription" value={item.productDescription || ''}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price In Selected Currency</Label>
                        <Input type="number" name="price" id="price" value={item.price || ''}
                            disabled />
                    </FormGroup>
                    <FormGroup>
                        <Label for="priceInEuro">Enter Price In Euro</Label>
                        <Input type="number" name="priceInEuro" id="priceInEuro" value={priceInEuro || ''}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>

                        <Label for="currencyType">CurrencyType</Label>

                        <Input type="select" name="currencyType" id="currencyType" value={selectedCurrency}
                            onChange={this.handleChange}>
                            {currency}
                        </Input>

                    </FormGroup>
                    <FormGroup>
                        <Label for="updatedBy">Updated By</Label>
                        <Input type="text" name="updatedBy" id="updatedBy" value={item.updateHistory.updatedBy || ''}
                            disabled/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="updateComment">Comment</Label>
                        <Input type="textarea" name="updateComment" id="updateComment" value={item.updateHistory.updateComment || ''}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/categories">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}


export default UpdateProduct;