import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/userActions";
import Login from "../components/Login";

const MapStateToProps = ({ user }) => ({
    user
});

export default connect(
    MapStateToProps,
    { loginUser }
)(Login);
