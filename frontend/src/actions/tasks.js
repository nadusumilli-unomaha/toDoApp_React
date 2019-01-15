import axios from "axios";

// Tasks endpoint
const tasks_endpoint = "/api/v1/tasks/";

// Request methods to create server requests.
const HTTP_POST = "post";
const HTTP_GET = "get";
const HTTP_DELETE = "delete";
const HTTP_PUT = "put";

// Action types for the redux store management.
const REQUEST_TASK_SUCCESS = "REQUEST_TASK_SUCCESS";
const REQUEST_TASK_ERROR = "REQUEST_TASK_ERROR";
const REQUEST_TASK_LOADING = "REQUEST_TASK_LOADING";

/** Function: taskRequests
 *  Arguments:
 *      - request_data: the data to be sent with the request.
 *      - request_url: The url to send the request to.
 *      - request_method: The method to use to send the request.
 *  Defenition:
 *      Sends a request to the tasks backend and helps create,
 *      read, update and delete an task.
 *  Returns: None
 **/
const taskRequests = (
    request_data,
    request_method,
    request_url
) => dispatch => {
    let settings = {
        url: request_url,
        method: request_method
    };

    if (request_method === "get") settings.params = request_data;
    else if (request_method === "delete")
        settings.url = request_url + request_data.id + "/";
    else settings.data = request_data;

    axios(settings).then(
        succ => dispatch({ type: REQUEST_TASK_SUCCESS, payload: succ.data }),
        err =>
            dispatch({ type: REQUEST_TASK_ERROR, payload: err.response.data })
    );
};

/** Function: createtask
 *  Arguments:
 *      - request_data: the data to be sent with the request.
 *  Defenition:
 *      Sends a request to the tasks backend and helps create
 *      an task
 *  Returns: None
 **/
const createTask = request_data => dispatch =>
    dispatch(taskRequests(request_data, HTTP_POST, tasks_endpoint));

/** Function: updatetask
 *  Arguments:
 *      - request_data: the data to be sent with the request.
 *  Defenition:
 *      Sends a request to the tasks backend and helps update
 *      an task
 *  Returns: None
 **/
const updateTask = request_data => dispatch =>
    dispatch(taskRequests(request_data, HTTP_PUT, tasks_endpoint));

/** Function: gettask
 *  Arguments:
 *      - request_data: the data to be sent with the request.
 *  Defenition:
 *      Sends a request to the tasks backend and helps get
 *      an task
 *  Returns: None
 **/
const getTasks = request_data => dispatch =>
    dispatch(taskRequests(request_data, HTTP_GET, tasks_endpoint));

/** Function: deletetask
 *  Arguments:
 *      - request_data: the data to be sent with the request.
 *  Defenition:
 *      Sends a request to the tasks backend and helps delete
 *      an task
 *  Returns: None
 **/
const deleteTask = request_data => dispatch =>
    dispatch(taskRequests(request_data, HTTP_DELETE, tasks_endpoint));

// Exports from task actions.
export {
    createTask,
    REQUEST_TASK_SUCCESS,
    REQUEST_TASK_LOADING,
    REQUEST_TASK_ERROR,
    updateTask,
    getTasks,
    deleteTask
};
