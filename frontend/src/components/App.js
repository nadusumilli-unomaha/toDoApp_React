import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../containers/Home";
import Login from "../containers/Login";
import Register from "../containers/Register";
import Auth from "../highOrderComponents/Authenticate";
import Profile from "../containers/Profile";
import Todo from "../containers/Todo";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/register" component={Register} />
                        <Route path="/todo" component={Todo} />
                        <Route path="/" component={Auth(Home)} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
