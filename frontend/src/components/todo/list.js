import React, { Component } from "react";
import Loading from "../../pages/Loading";

class Todo extends Component {
    state = {
        loading: true
    };

    componentDidMount() {
        const { getTasks } = this.props;
        getTasks({ owner: this.props.user.id });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tasks.data !== this.props.tasks.data) {
            if (!this.props.tasks.data)
                this.props.getTasks({ owner: this.props.user.id });
            else this.setState({ loading: false });
        }
    }

    deleteTask = id => e => {
        e.preventDefault();
        const { deleteTask } = this.props;
        this.setState({ loading: true });
        deleteTask({ id: id });
    };

    render() {
        if (this.state.loading) return <Loading />;
        const { tasks } = this.props;
        return (
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title text-center">Todo</div>
                        <table className="table table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Task #</th>
                                    <th scope="col">Due Date</th>
                                    <th scope="col">Priority</th>
                                    <th scope="col">Content</th>
                                    <th scope="col">Users</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.data &&
                                    tasks.data.map((task, idx) => (
                                        <tr>
                                            <td>{idx + 1}</td>
                                            <td>{task.due_date}</td>
                                            <td>{task.priority}</td>
                                            <td>{task.content}</td>
                                            <td>{task.participants}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={this.deleteTask(
                                                        task.id
                                                    )}
                                                >
                                                    delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Todo;
