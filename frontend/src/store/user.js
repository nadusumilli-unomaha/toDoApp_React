const REQUEST_SUCCESS = "REQUEST_SUCCESS";
const REQUEST_FAILURE = "REQUEST_FAILURE";
const REQUEST_LOADING = "REQUEST_LOADING";

const initialState = {
    isAuthenticated: false
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_SUCCESS:
            return state;
        case REQUEST_FAILURE:
            return state;
        case REQUEST_LOADING:
            return state;
        default:
            return state;
    }
};

export default user;
