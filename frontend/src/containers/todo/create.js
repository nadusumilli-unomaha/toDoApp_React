import React from "react";
import { connect } from "react-redux";
import Todo from "../../components/todo/create";
import { createTask } from "../../actions/tasks";

const MapStateToProps = ({ user, tasks }) => ({
    user,
    tasks
});

export default connect(
    MapStateToProps,
    { createTask }
)(Todo);
