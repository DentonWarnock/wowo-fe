import axios from "axios";

// User Actions Types
export const GET_USER = "GET_USER";
export const GET_USERS = "GET_USERS";
export const GET_CLIENT_INFO_SUCCESS = "GET_CLIENT_INFO_SUCCESS";
export const GET_CLIENT_INFO_ERROR = "GET_CLIENT_INFO_ERROR";
export const UPDATE_CLIENT_INFO_SUCCESS = "UPDATE_CLIENT_INFO_SUCCESS";
export const UPDATE_CLIENT_INFO_ERROR = "UPDATE_CLIENT_INFO_ERROR";

// Washer Signup action types
export const CREATE_WASHER_START = "CREATE_WASHER_START";
export const CREATE_WASHER_SUCCESS = "CREATE_WASHER_SUCCESS";
export const CREATE_WASHER_FAILED = "CREATE_WASHER_FAILED";
export const LOGGING_IN = "LOGGING_IN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

// User signup action types
export const LOADING = "LOADING";
export const NEW_CLIENT_SUCCESS = "NEW_CLIENT_SUCCESS";
export const NEW_CLIENT_ERROR = "NEW_CLIENT_ERROR";

// Washer Dashboard action types
export const WASHER_SET_WORK_STATUS_START = "WASHER_SET_WORK_STATUS_START";
export const WASHER_SET_WORK_STATUS_SUCCESS = "WASHER_SET_WORK_STATUS_SUCCESS";
export const WASHER_SET_WORK_STATUS_FAILED = "WASHER_SET_WORK_STATUS_FAILED";
export const WASHER_GET_WORK_STATUS_START = "WASHER_GET_WORK_STATUS_START";
export const WASHER_GET_WORK_STATUS_SUCCESS = "WASHER_GET_WORK_STATUS_SUCCESS";
export const WASHER_GET_WORK_STATUS_FAILED = "WASHER_GET_WORK_STATUS_FAILED";
export const WASHER_GET_WASH_COUNT_START = "WASHER_GET_WASH_COUNT_START";
export const WASHER_GET_WASH_COUNT_SUCCESS = "WASHER_GET_WASH_COUNT_SUCCESS";
export const WASHER_GET_WASH_COUNT_FAILED = "WASHER_GET_WASH_COUNT_FAILED";
export const WASHER_GET_RATING_START = "WASHER_GET_RATING_START";
export const WASHER_GET_RATING_SUCCESS = "WASHER_GET_RATING_SUCCESS";
export const WASHER_GET_RATING_FAILED = "WASHER_GET_RATING_FAILED";

export function loginUser(email, password) {
  return dispatch => {
    dispatch({ type: LOGGING_IN });

    return axios
      .post("https://pt6-wowo.herokuapp.com/authPG/login", { email, password })
      .then(res => {
        console.log(res.data, "res.data");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userType", res.data.userType);
        localStorage.setItem("firstName", res.data.firstName);
        localStorage.setItem("lastName", res.data.lastName);
        localStorage.setItem("id", res.data.id);
        console.log(localStorage);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAILED,
          payload: err
        });
      });
  };
}

export function createClient(payload) {
  return dispatch => {
    dispatch({ type: LOADING });

    return axios
      .post("https://pt6-wowo.herokuapp.com/authPG/registerClient", payload)
      .then(res => {
        console.log(res);
        dispatch({ type: NEW_CLIENT_SUCCESS, payload: res.data });
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch({ type: NEW_CLIENT_ERROR, payload: err.response.data });
      });
  };
}

export function getClientInformation(id) {
  return dispatch => {
    return (
      axios
        .get(`https://pt6-wowo.herokuapp.com/users/${id}`)
        // .get(`http://localhost:3300/users/${id}`)
        .then(res => {
          console.log("this is response on getclient information", res);
          dispatch({ type: GET_CLIENT_INFO_SUCCESS, payload: res.data });
        })
        .catch(err => {
          dispatch({ type: GET_CLIENT_INFO_ERROR });
        })
    );
  };
}
export function updateClientInformation(id, changes) {
  return dispatch => {
    return (
      axios
        .put(`https://pt6-wowo.herokuapp.com/users/${id}`, changes)
        // .put(`http://localhost:3300/users/${id}`, changes)
        .then(res => {
          dispatch({ type: UPDATE_CLIENT_INFO_SUCCESS, payload: res.data });
        })
        .catch(err => {
          console.log("this is error on update", err);
          dispatch({ type: UPDATE_CLIENT_INFO_ERROR });
        })
    );
  };
}
