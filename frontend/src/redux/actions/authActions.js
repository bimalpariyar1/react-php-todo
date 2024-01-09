import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    CLEAR_ERROR_MESSAGE,
} from "../constants";

import API from "services/api";

export const userLogin = (formData) => (dispatch) => {
    dispatch({
        type: USER_LOGIN_REQUEST,
    });

    return API.post("/api/login", formData)
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            dispatch({
                type: USER_LOGIN_SUCCESS,
            });

            return response.data;
        })
        .catch((error) => {
            const allErrors = error?.response?.data?.errors;

            if (allErrors) {
                const errors = {};
                Object.entries(allErrors).forEach(([key, value]) => {
                    errors[key] = value[0];
                });

                dispatch({
                    type: USER_LOGIN_FAILED,
                    payload: errors,
                });
            }
        });
};

export const userRegistration = (formValues) => (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST,
    });

    const formData = new FormData();

    Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
    });

    return API.post("/api/register", formData)
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            dispatch({
                type: USER_REGISTER_SUCCESS,
            });

            return response.data;
        })
        .catch((error) => {
            const allErrors = error?.response?.data?.errors;

            if (allErrors) {
                const errors = {};
                Object.entries(allErrors).forEach(([key, value]) => {
                    errors[key] = value[0];
                });

                dispatch({
                    type: USER_REGISTER_FAILED,
                    payload: errors,
                });
            }
        });
};

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT_REQUEST,
    });

    return API.post("/api/logout")
        .then((response) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            dispatch({
                type: LOGOUT_SUCCESS,
            });

            return response;
        })
        .catch((error) => {
            dispatch({
                type: LOGOUT_FAILED,
            });
            return error;
        });
};

export const clearErrorMessage = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR_MESSAGE,
        payload: {},
    });
};
