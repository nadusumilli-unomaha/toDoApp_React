import React from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/userActions";
import Register from "../components/Register";

const MapStateToProps = ({ user }) => ({
    user
});

export default connect(
    MapStateToProps,
    { registerUser }
)(Register);
