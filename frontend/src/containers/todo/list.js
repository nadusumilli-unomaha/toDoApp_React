import React from "react";
import { connect } from "react-redux";
import Todo from "../../components/todo/list";
import { getTasks, deleteTask } from "../../actions/tasks";

const MapStateToProps = ({ user, tasks }) => ({
    user,
    tasks
});

export default connect(
    MapStateToProps,
    { getTasks, deleteTask }
)(Todo);
