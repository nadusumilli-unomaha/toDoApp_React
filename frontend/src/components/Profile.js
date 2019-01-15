import React, { Component } from "react";

class Profile extends Component {
    render() {
        return (
            <div className="container col-6 offset-3">
                <div className="card">
                    <div className="card-header text-center">Profile</div>
                    <div className="card-body">
                        <form className="is-validated">
                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label htmlFor="first_name">
                                        First Name
                                    </label>
                                    <input
                                        className="form-control"
                                        placeholder="Enter a First Name"
                                    />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input
                                        className="form-control"
                                        placeholder="Enter a Last Name"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
