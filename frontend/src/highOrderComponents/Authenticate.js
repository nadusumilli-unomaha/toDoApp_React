import React, { Component } from "react";
import { connect } from "react-redux";

const Authenticate = ComposedComponent => {
    class Authenticate extends Component {
        render() {
            return <ComposedComponent />;
        }
    }

    return connect(
        null,
        null
    )(Authenticate);
};

export default Authenticate;
