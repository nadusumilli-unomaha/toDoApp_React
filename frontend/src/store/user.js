import * as user_actions from "../actions/userActions";

const initialState = {
    id: null,
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    is_authenticated: false,
    is_admin: false,
    token_expires: "",
    error: ""
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case user_actions.REQUEST_SUCCESS:
            if (action.payload.status == 204) return { ...initialState };
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                first_name: action.payload.email,
                last_name: action.payload.email,
                is_authenticated: action.payload.is_authenticated,
                is_admin: action.payload.is_admin,
                error: action.payload.error,
                token_expires: action.payload.token_expires
            };
        case user_actions.REQUEST_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case user_actions.REQUEST_LOADING:
            return state;
        default:
            return state;
    }
};

export default user;
