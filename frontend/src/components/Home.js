import React, { Component } from "react";
import ListTodo from "../containers/todo/list";

class Home extends Component {
    redirectToCreateTodo = e => {
        e.preventDefault();
        this.props.history.push("/todo/create");
    };

    render() {
        return (
            <div className="container">
                <div className="row mb-5">
                    <div className="col-12">
                        <span onClick={this.redirectToCreateTodo}>
                            <i className="fas fa-plus float-right" />
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <ListTodo history={this.props.history} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
