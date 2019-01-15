import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { userStatus } from "../actions/userActions";

const Authenticate = ComposedComponent => {
    class Authenticate extends Component {
        constructor(props) {
            super(props);
            const { is_authenticated, history, userStatus } = props;
            if (localStorage.todo_token && !is_authenticated) {
                const token = localStorage.todo_token || "";
                userStatus({ token });
            } else if (!is_authenticated) {
                history.push("/login");
            }
        }

        componentDidUpdate() {
            const { is_authenticated, history } = this.props;
            if (!is_authenticated) {
                history.push("/login");
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    Authenticate.protoType = {
        is_authenticated: PropTypes.bool
    };

    const MapStateToProps = ({ user }) => ({
        is_authenticated: user.is_authenticated
    });

    return connect(
        MapStateToProps,
        { userStatus }
    )(Authenticate);
};

export default Authenticate;
