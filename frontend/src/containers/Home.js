import { connect } from "react-redux";

import Home from "../components/Home";

const MapStateToProps = ({ user }) => ({
    user
});

export default connect(
    MapStateToProps,
    {}
)(Home);
