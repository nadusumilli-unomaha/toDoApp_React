import React, { Component } from "react";
import "../../assets/css/Header.css";
import Logout from "../pages/Logout";
import { PropTypes } from "prop-types";

class Header extends Component {
    handleLogout = e => {
        e.preventDefault();
        let { logoutUser, user } = this.props;
        logoutUser(user);
    };

    static propTypes = {
        user: PropTypes.object.isRequired,
        logoutUser: PropTypes.func.isRequired
    };

    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light navbar-custom-color">
                <a href="#" className="navbar-brand">
                    Todo App
                </a>
                <button
                    className="navbar-toggler navbar-toggler-right"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-lable="Toggle Navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div class="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">
                                Home<span class="sr-only">(current)</span>
                            </a>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        {/* Auth status checks. */}
                        {this.props.user.isAuthenticated ? (
                            <Logout
                                username={this.props.user.username}
                                handleLogout={this.handleLogout}
                            />
                        ) : (
                            <li className="nav-item">
                                <a className="nav-link">Login</a>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
