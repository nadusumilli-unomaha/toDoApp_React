import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { userStatus } from "../actions/userActions";

const Authenticate = ComposedComponent => {
    class Authenticate extends Component {
        constructor(props) {
            super(props);
            if (localStorage.todo_token && !props.isAuthenticated) {
                const { userStatus } = this.props;
                const token = localStorage.todo_token || "";
                console.log(token);
                userStatus({ token });
            } else if (!props.isAuthenticated) {
                props.history.push("/login");
            }
        }

        componentDidUpdate() {
            const { isAuthenticated } = this.props;
            if (!isAuthenticated) {
                this.props.history.push("/login");
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    Authenticate.protoType = {
        isAuthenticated: PropTypes.bool
    };

    const MapStateToProps = ({ user }) => ({
        isAuthenticated: user.isAuthenticated
    });

    return connect(
        MapStateToProps,
        { userStatus }
    )(Authenticate);
};

export default Authenticate;
