import React from "react";
import { connect } from "react-redux";
import Todo from "../components/Todo";

const MapStateToProps = ({ user }) => ({
    user
});

export default connect(
    MapStateToProps,
    {}
)(Todo);
