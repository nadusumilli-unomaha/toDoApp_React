import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { userStatus } from "../actions/userActions";

/** Function: Authenticate
 *  Arguments:
 *      - ComponentToCompose: component to authenticate
 *  Defenition:
 *      Takes in a access restricted component and checks if the
 *      user is logged in. If the user is logged in returns the
 *      component or redirects to the log in page.
 *  Returns:
 *      - Authenticate class
 **/
const Authenticate = ComponentToCompose => {
    /** Component: Authenticate
     *  Arguments: None
     *  Defenition:
     *      Checks if the user is logged in. If the user is
     *      logged in returns the component or redirects to
     *      the login page.
     *  Returns:
     *      - Component or redirects to login.
     **/
    class Authenticate extends Component {
        /** Function: componentDidMount
         *  Arguments: None
         *  Defenition:
         *      Checks if the user is authenticated or has a token
         *      if token exists and user is not authenticated
         *      user status is requested with token else redirected
         *      to login page.
         *  Returns: None
         **/
        componentDidMount() {
            this.checkAndRedirect();
        }

        /** Function: componentDidUpdate
         *  Arguments: None
         *  Defenition:
         *      Checks if the user is authenticated. If the user
         *      is not authenticated they are redirected to login.
         *  Returns: None
         **/
        componentDidUpdate() {
            if (!this.props.user.is_authenticated)
                this.props.history.push("/login");
        }

        /** Function: checkAndRedirect
         *  Arguments: None
         *  Defenition:
         *      Checks if the user is authenticated. If the user
         *      is not authenticated they are redirected to login.
         *  Returns: None
         **/
        checkAndRedirect() {
            const { user, history, userStatus } = this.props;
            if (!user.is_authenticated) {
                if (localStorage.getItem("todo_token")) {
                    const token = localStorage.todo_token || "";
                    userStatus({ token });
                } else {
                    history.push("/login");
                }
            }
        }

        // Returns the html or jsx for authenticate class.
        render() {
            return (
                <div className="container-fluid">
                    {this.props.user.is_authenticated ? (
                        <ComponentToCompose {...this.props} />
                    ) : null}
                </div>
            );
        }
    }

    // PropTypes for type checking and restrictions.
    Authenticate.propType = {
        user: PropTypes.object.isRequired,
        userStatus: PropTypes.func.isRequired
    };

    /** Function: MapStateToProps
     *  Arguments:
     *      - props: props from the redux store.
     *  Defenition:
     *      Maps the state of the component to props.
     *  Returns:
     *      - props
     **/
    const MapStateToProps = ({ user }) => ({
        user: user
    });

    // Connect the store to the component.
    return connect(
        MapStateToProps,
        { userStatus }
    )(Authenticate);
};

export default Authenticate;
