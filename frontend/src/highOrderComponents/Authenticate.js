import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { userStatus } from "../actions/userActions";

const Authenticate = ComposedComponent => {
    class Authenticate extends Component {
        constructor(props) {
            super(props);
            if (!props.isAuthenticated && localStorage.todo_token) {
            } else if (!props.isAuthenticated) {
                props.history.push("/login");
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
