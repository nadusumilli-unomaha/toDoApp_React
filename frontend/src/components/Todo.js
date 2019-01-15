import React, { Component } from "react";

class Todo extends Component {
    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title text-center">Todo</div>
                        <table className="table table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col" colspan="6">
                                        Tasks
                                    </th>
                                    <th scope="col">Due Date</th>
                                    <th scope="col">Priority</th>
                                    <th scope="col">Users</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Todo;
