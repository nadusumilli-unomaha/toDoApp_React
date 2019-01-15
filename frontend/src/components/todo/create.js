import React, { Component } from "react";

class CreateTodo extends Component {
    state = {
        content: null,
        due_date: null,
        priority: null,
        participants: ["/api/v1/users/" + this.props.user.id + "/"],
        owner: "/api/v1/users/" + this.props.user.id + "/"
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { createTask } = this.props;
        createTask(this.state);
    };

    componentDidUpdate(prevProps) {
        if (prevProps.tasks.data !== this.props.tasks.data) {
            this.props.history.push("/home");
        }
    }

    render() {
        return (
            <div className="container">
                <div className="col-4 offset-4">
                    <div className="card">
                        <div className="card-header text-center">
                            Create a Task
                        </div>
                        <div className="card-body">
                            <form className="form">
                                <div className="form-group">
                                    <label>Contet:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="content"
                                        placeholder="Please enter content"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Prioriy:</label>
                                    <select
                                        class="form-control"
                                        name="priority"
                                        value={this.state.priority}
                                        onChange={this.onChange}
                                    >
                                        <option>Select a value</option>
                                        <option value="HP">
                                            High Priority
                                        </option>
                                        <option value="MP">
                                            Medium Priority
                                        </option>
                                        <option value="LP">Low Priority</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Due Date:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="due_date"
                                        placeholder="Please enter a task Name"
                                        value={this.state.date}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <button
                                        type="submit"
                                        className="btn btn-primary form-control"
                                        onClick={this.handleSubmit}
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateTodo;
