import React from "react";
import Profile from "../components/Profile";
import { connect } from "react-redux";

const MapStateToProps = ({ user }) => ({
    user
});

export default connect(
    MapStateToProps,
    {}
)(Profile);
