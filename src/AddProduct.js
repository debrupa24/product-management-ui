import React from 'react';

import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class AddProduct extends React.Component {
    emptyItem = {
        productName: '',
        productDescription: '',
        currencyType: 'EUR',
        price: '',
        createdAt: new Date(),
        createdBy: 'testuser'
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            selectedId: props.match.params.selectedId,
            rates: {},
            isAdded: false,
            products: props.match.params.products,
            currencies: [],
            priceInEuro: 0,
            selectedCurrency: "EUR"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
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
        this.setState({ item });

    }

    async handleSubmit(event) {
        event.preventDefault();
        const { item } = this.state;
        console.log(JSON.stringify(item));
        await fetch(`/product/addProduct/${this.state.selectedId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then(() => {
            this.setState({ isAdded: true });
            this.props.history.push('/categories');
        });;

    }

    render() {
        const { item, isAdded, currencies, priceInEuro, selectedCurrency } = this.state;

        if (isAdded) {
            return (
                <p className="text-success">Added Successfully!!</p>
            )

        }

        const currency = currencies.map(c => {
            return <option key={c}>{c}</option>
        });
        const title = <h2>Add Product </h2>;

        return <div>
            <AppNavbar />
            <Container>
                <h3  className="formPadding">{title}</h3>
                <Form onSubmit={this.handleSubmit} className="formPadding">
                    <FormGroup>
                        <Label for="productName">Product Name</Label>
                        <Input type="text" name="productName" id="productName" value={item.productName || ''}
                            onChange={this.handleChange} />
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
                        <Label for="createdBy">Created By</Label>
                        <Input type="text" name="createdBy" id="createdBy" value={item.createdBy || ''}
                            disabled/>
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


export default AddProduct;