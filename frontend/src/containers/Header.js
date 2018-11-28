import { connect } from "react-redux";
import Header from "../components/Header";
import { userStatus, logoutUser } from "../actions/userActions";

const MapStateToProps = ({ user }) => ({
    user: user
});

export default connect(
    MapStateToProps,
    { userStatus, logoutUser }
)(Header);
