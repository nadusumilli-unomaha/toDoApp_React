import axios from "axios";
import set_token from "./setAuthToken";

const REQUEST_SUCCESS = "REQUEST_SUCCESS";
const REQUEST_FAILURE = "REQUEST_FAILURE";
const REQUEST_LOADING = "REQUEST_LOADING";

const HTTP_POST = "post";
const HTTP_GET = "get";
const HTTP_DELETE = "delete";

const session_endpoint = "/api/session";
const register_endpoint = "/api/register";

const userRequest = (
    user_details,
    request_method,
    request_endpoint
) => dispatch => {
    let settings;

    settings = {
        method: request_method,
        url: request_endpoint
    };

    if (request_method === "post" && localStorage.todo_token) {
        localStorage.removeItem("todo_token");
        set_token(false);
    }

    if (request_method === "get") settings.params = user_details;
    else settings.data = user_details;

    // axios request to fetch data.
    axios(settings).then(
        res => {
            // Setting the auth token for further requests.
            // Storing the token in localstorage.
            // dispatching the actions.
            // token = res.data.token || "token";
            // setToken(token);
            // localStorage.setItem("todo_token", token);
            dispatch({ type: REQUEST_SUCCESS, payload: res.data });
        },
        err => {
            console.log(err);
            dispatch({ type: REQUEST_FAILURE, payload: err });
        }
    );
};

const userStatus = user_details => dispatch =>
    dispatch(userRequest(user_details, HTTP_GET, session_endpoint));

const loginUser = user_details => dispatch =>
    dispatch(userRequest(user_details, HTTP_POST, session_endpoint));

const logoutUser = user_details => dispatch =>
    dispatch(userRequest(user_details, HTTP_DELETE, session_endpoint));

const registerUser = user_details => dispatch =>
    dispatch(userRequest(user_details, HTTP_POST, register_endpoint));

export {
    userStatus,
    loginUser,
    logoutUser,
    registerUser,
    REQUEST_SUCCESS,
    REQUEST_FAILURE,
    REQUEST_LOADING
};
