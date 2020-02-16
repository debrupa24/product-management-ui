import React from 'react';

import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class UpdateCategory extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            item: JSON.parse(props.match.params.category),
            selectedId: props.match.params.selectedId,
            isUpdated: false,
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
        console.log(value);

        let item = { ...this.state.item };

        item[name] = value;
        if(name === 'updateComment'){
            item.updateHistory.updateComment=value;
        }
        this.setState({ item });

    }

    async handleSubmit(event) {
        event.preventDefault();
        const { item } = this.state;
        console.log(JSON.stringify(item));
        await fetch(`/category/updateCategory`, {
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
        const { item, isUpdated} = this.state;

       

        const title = <h2>Update Category </h2>;

        return <div>
            <AppNavbar />
            <Container>
            <h3  className="formPadding">{title}</h3>
                <Form onSubmit={this.handleSubmit} className="formPadding">
                    <FormGroup>
                        <Label for="catagoryName">Category Name</Label>
                        <Input type="text" name="catagoryName" id="catagoryName" value={item.catagoryName || ''}
                            disabled />
                    </FormGroup>
                    <FormGroup>
                        <Label for="catagoryDescription">Category Description</Label>
                        <Input type="textarea" name="catagoryDescription" id="catagoryDescription" value={item.catagoryDescription || ''}
                            onChange={this.handleChange} />
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


export default UpdateCategory;