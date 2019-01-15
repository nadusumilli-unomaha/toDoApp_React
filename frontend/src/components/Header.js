import React, { Component } from "react";
import "../../assets/css/Header.css";
import Logout from "../pages/Logout";
import { Link } from "react-router-dom";
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
                    aria-labelledby="Toggle Navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/home" className="nav-link">
                                Home<span className="sr-only">(current)</span>
                            </Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        {/* Auth status checks. */}
                        {this.props.user.is_authenticated ? (
                            <Logout
                                username={this.props.user.username}
                                handleLogout={this.handleLogout}
                            />
                        ) : (
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
