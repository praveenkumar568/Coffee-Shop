import React, { Component } from 'react';
import { data } from "./data";
import { Col, Card, Button, Icon } from "antd";
import { Link } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: [],
            total: 0
        }
    }
    addItem = (item) => {
        let { data1, total } = this.state
        let matchedItem = data1.filter(i => i.id == item.id)
        if (matchedItem.length) {
            matchedItem[0].quantity++; total += item.price
        }
        else {
            data1.push({ id: item.id, quantity: 1, name: item.name, price: item.price,image:item.image });
            total += item.price;
        }
        this.setState({ data1, total })
    }
    render() {
        let { data1, total } = this.state
        return (
            <div className="items">
                <div className="header">
                    <h1>Coffee Shop</h1>
                    <div className="cart">
                        <Link to={{ pathname: '/savedItems', state: { savedData: data1, total: total } }}><Icon type="shopping-cart" />
                        </Link>
                        {data1.length>0?<p>{data1.length}</p>:null}
                    </div>
                </div>
                <div className="cart-body">
                    {data.map((item, key) =>
                        <Col xxl={3} xl={4} lg={7} md={10} sm={10} xs={24} key={key}>
                            <Card>
                                <figure>
                                <img src={item.image} alt="cart image" />
                                </figure>
                                <div>
                                <h3>{item.name}</h3>
                                <p><b>Price : </b>Rs.{item.price}</p>
                                    <Button type="primary" className="addButton" onClick={this.addItem.bind(this, item)}>ADD</Button></div>
                            </Card>
                        </Col>
                    )}
                </div>
            </div>
        )
    }
}