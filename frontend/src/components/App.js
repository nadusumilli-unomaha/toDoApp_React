import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "./Home";
import Login from "../containers/Login";
import Auth from "../highOrderComponents/Authenticate";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/" component={Auth(Home)} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
