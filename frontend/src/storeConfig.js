import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";
import reducers from "./store";

const configureStore = () =>
    createStore(reducers, compose(applyMiddleware(Thunk)));

export default configureStore;
