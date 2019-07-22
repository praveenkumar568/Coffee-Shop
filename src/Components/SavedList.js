import React, { Component } from 'react';
import { Col, Card, Icon, Button, Row, Modal } from "antd";
import { Link } from 'react-router-dom'

export default class savedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderModelVisible: false,
            cartItems: this.props.location.state.savedData
        }
    }
    orderModel = () => {
        this.setState({ orderModelVisible: true, cartItems: [] })
    }
    handleClose = () => {
        this.setState({ orderModelVisible: false })
        this.props.history.push('/')
    }
    removeItem = (item) => {
        let { cartItems, total } = this.state;
            var index = cartItems.indexOf(item);
            if (index > -1) {
                if(cartItems[index].quantity>1){
                    cartItems[index].quantity--;
                    total-=item.price
                }else{
                    cartItems.splice(index, 1);
                    total -= item.price;
                }
            }
        this.setState({ cartItems, total })
    }
    render() {
        var { cartItems } = this.state;
        return (
            <div className="savedList">
                <div className="header">
                    <Link to="/"><Icon type="arrow-left" /></Link>
                </div>
                {cartItems.length > 0 ? <div className="cart-body">
                   <Row> <Col span={24}>
                        {this.props.location.state.savedData.map((item, key) =>
                            <Col  xxl={6} xl={8}  md={12} sm={24}  key={key}>
                                <Card className="savedList-card">
                                    <ul>
                                        <li>
                                            <img alt="ImageItem" src={item.image} />
                                        </li>
                                        <li>
                                            <h3>{item.name}</h3>
                                            <p><b>Quantity : </b>{item.quantity}</p>
                                            <p><b>Total : </b>Rs.{(item.price) * (item.quantity)}</p>
                                            <Button type="primary" onClick={() => this.removeItem(item)}>Remove Item</Button>
                                        </li>
                                    </ul>
                                </Card>
                            </Col>
                        )}
                    </Col>
                    </Row>
                    <Row>
                    <Col offset={10}>
                        <Button type="primary" onClick={this.orderModel}>Check Out Rs.{this.props.location.state.total}</Button>
                    </Col>
                    </Row>
                </div> :
                    <h2>No items in your Cart</h2>
                }
                <Modal
                    title=""
                    centered
                    visible={this.state.orderModelVisible}
                    onOk={this.handleClose}
                    onCancel={this.handleClose}
                    footer={null}
                >
                    <h4>Your order placed successfully</h4>
                </Modal>
            </div>
        )
    }
}