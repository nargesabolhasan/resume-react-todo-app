import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoCheckmarkCircleOutline, IoTrashBin } from "react-icons/io5";
import style from './style.module.scss';

class Todolist extends Component {

    //--------------
    removeItem = (currentTtem) => {
        this.props.removingTodo(currentTtem);
    };
    //--------------
    doneItem = (currentTtem) => {
        this.props.doneTodo(currentTtem);
        this.props.removingTodo(currentTtem);
    };
    //--------
    handleEditing = event => {
        event.target.nextSibling.disabled = false;
    }
    //---------
    handleUpdatedDone = event => {
        if (event.key === "Enter") {
            event.target.disabled = true;
        }
    }
    //----------
    componentWillUnmount() {
        this.removeItem()
        this.doneItem()
    }
    //-----------
    randomId = (() => {
        const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
        return uint32.toString(16);
    })
    //----------
    componentDidMount() {
        this.randomId()
    }
    //----------

    render() {
        return (
            <Form className='bg-warning p-1 mb-3'>
                <h3
                    className='text-center text-dark fs-3 p-2 '
                >Have To do:</h3>
                {this.props.data.map((item, i) => {
                    return (
                        <Container key={item.ban.id}>
                            <li
                                key={item.ban.id}
                                className="d-flex justify-content-between bg-dark mb-4 p-3"
                                style={{ borderRadius: "50px 0px 0px 50px" }}
                            >
                                <h6
                                    className=" h6 text-white p-1 d-sm-none  d-md-block "
                                    style={{ width: "150px", textAlign: "center" }}
                                >press enter to save Edits</h6>
                                <Button
                                    className="bg-warning border-warning text-dark"
                                    onClick={this.handleEditing}>
                                    Edit
                                </Button>
                                <Form.Control
                                    className={style.inputstyle}
                                    disabled={true}
                                    id={item.ban.id}
                                    type="text"
                                    value={item.ban.text}
                                    onChange={(e) => {
                                        this.props.setUpdate(e.target.value, e.target.id)
                                    }}
                                    onKeyDown={this.handleUpdatedDone}
                                />

                                <Button
                                    className="bg-danger border-danger text-white mx-2"
                                    onClick={() => this.removeItem(item)}
                                ><IoTrashBin

                                        className="fs-3 mx-auto" />
                                </Button>
                                <Button
                                    className="bg-success border-success text-white fa-3"
                                    onClick={() => this.doneItem(item)}
                                >
                                    <IoCheckmarkCircleOutline

                                        className="fs-3 mx-auto" />
                                </Button>
                                <span
                                    className="text-white text-start fs-2"
                                    style={{ marginLeft: '10px' }}
                                >{i + 1}</span>
                            </li>

                        </Container>
                    );
                })
                }

            </Form >
        );
    }
}

export default Todolist;