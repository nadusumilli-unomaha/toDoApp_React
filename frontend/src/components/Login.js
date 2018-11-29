import React, { Component } from "react";
import { PropTypes } from "prop-types";

class Login extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    state = {
        username: "",
        password: ""
    };

    static propTypes = {
        user: PropTypes.object.isRequired,
        loginUser: PropTypes.func.isRequired
    };

    usernameChange = e => {
        e.preventDefault();
        this.setState({ username: e.target.value });
    };

    passwordChange = e => {
        e.preventDefault();
        this.setState({ password: e.target.value });
    };

    handleLogin = e => {
        e.preventDefault();
        let { username, password } = this.state;
        let { loginUser } = this.props;
        loginUser({ username, password });
    };

    render() {
        const { user } = this.props;
        if (user.isAuthenticated) {
            this.props.history.push("/");
        }
        return (
            <div className="container">
                <div className="col-md-6 offset-md-3">
                    <div className="card mb-3">
                        <div className="card-header text-center">Login</div>
                        <div className="card-body">
                            <div className="form-group">
                                <label className="form-label">Username: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Please enter your username"
                                    onChange={this.usernameChange}
                                    value={this.state.username}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Password: </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Please enter your password"
                                    onChange={this.passwordChange}
                                    value={this.state.password}
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary form-control"
                                    onClick={this.handleLogin}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
