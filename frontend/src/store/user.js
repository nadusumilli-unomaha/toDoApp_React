import * as user_actions from "../actions/userActions";

const initialState = {
    id: null,
    username: "",
    email: "",
    isAuthenticated: false,
    isAdmin: false
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case user_actions.REQUEST_SUCCESS:
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                isAuthenticated: action.payload.isAuthenticated,
                isAdmin: action.payload.isAdmin
            };
        case user_actions.REQUEST_FAILURE:
            return state;
        case user_actions.REQUEST_LOADING:
            return state;
        default:
            return state;
    }
};

export default user;
