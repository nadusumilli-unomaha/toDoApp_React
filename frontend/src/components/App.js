import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../containers/Home";
import Login from "../containers/Login";
import Register from "../containers/Register";
import Auth from "../highOrderComponents/Authenticate";
import Profile from "../containers/Profile";
import ListTodo from "../containers/todo/list";
import CreateTodo from "../containers/todo/create";
import ShowTodo from "../containers/todo/show";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/profile" component={Auth(Profile)} />
                        <Route path="/register" component={Register} />
                        <Route path="/todo/list" component={Auth(ListTodo)} />
                        <Route
                            path="/todo/create"
                            component={Auth(CreateTodo)}
                        />
                        <Route path="/todo/show" component={Auth(ShowTodo)} />
                        <Route path="/" component={Auth(Home)} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
