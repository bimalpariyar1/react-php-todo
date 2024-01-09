import {
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILED,
    FETCH_TODO_REQUEST,
    FETCH_TODO_SUCCESS,
    FETCH_TODO_FAILED,
    MARK_TODO_REQUEST,
    MARK_TODO_SUCCESS,
    MARK_TODO_FAILED,
    EDIT_TODO_REQUEST,
    EDIT_TODO_SUCCESS,
    EDIT_TODO_FAILED,
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILED,
    CLEAR_ERROR_MESSAGE,
} from "../constants";

import API from "services/api";

export const addTodo = (options) => (dispatch) => {
    dispatch({
        type: ADD_TODO_REQUEST,
    });

    const formData = new FormData();

    Object.entries(options.formValues).forEach(([key, value]) => {
        formData.append(key, value);
    });

    return API.post("/api/todos", formData)
        .then((response) => {
            dispatch({
                type: ADD_TODO_SUCCESS,
                payload: response.data.todo,
            });
            return response;
        })
        .catch((error) => {
            console.log(error.response);
            const allErrors = error?.response?.data?.errors;

            if (allErrors) {
                const errors = {};
                Object.entries(allErrors).forEach(([key, value]) => {
                    errors[key] = value[0];
                });

                dispatch({
                    type: ADD_TODO_FAILED,
                    payload: errors,
                });
            }

            return error;
        });
};

export const fetchTodos = () => (dispatch) => {
    dispatch({
        type: FETCH_TODO_REQUEST,
    });

    return API.get("/api/todos")
        .then((response) => {
            dispatch({
                type: FETCH_TODO_SUCCESS,
                payload: response.data.data,
            });

            return response;
        })
        .catch((error) => {
            const allErrors = error?.response?.data?.errors;

            if (allErrors) {
                const errors = {};
                Object.entries(allErrors).forEach(([key, value]) => {
                    errors[key] = value[0];
                });

                dispatch({
                    type: FETCH_TODO_FAILED,
                    payload: errors,
                });
            }

            return error;
        });
};

export const markAsDone = (option) => (dispatch) => {
    dispatch({
        type: MARK_TODO_REQUEST,
    });

    return API.put(`/api/todos/${option.id}`, { ...option.formValues })
        .then((response) => {
            dispatch({
                type: MARK_TODO_SUCCESS,
                payload: response.data.data,
            });

            return response;
        })
        .catch((error) => {
            const allErrors = error?.response?.data?.errors;

            if (allErrors) {
                const errors = {};
                Object.entries(allErrors).forEach(([key, value]) => {
                    errors[key] = value[0];
                });

                dispatch({
                    type: MARK_TODO_FAILED,
                    payload: errors,
                });
            }

            return error;
        });
};

export const editTodo = (option) => (dispatch) => {
    dispatch({
        type: EDIT_TODO_REQUEST,
    });

    const formData = new FormData();

    Object.entries(option.formValues).forEach(([key, value]) => {
        formData.append(key, value);
    });

    formData.append("_method", "PUT");

    return API.post(`/api/todos/${option.id}`, formData)
        .then((response) => {
            dispatch({
                type: EDIT_TODO_SUCCESS,
                payload: response.data.data,
            });

            return response;
        })
        .catch((error) => {
            const allErrors = error?.response?.data?.errors;

            if (allErrors) {
                const errors = {};
                Object.entries(allErrors).forEach(([key, value]) => {
                    errors[key] = value[0];
                });

                dispatch({
                    type: EDIT_TODO_FAILED,
                    payload: errors,
                });
            }

            return error;
        });
};

export const deleteTodo = (id) => (dispatch) => {
    dispatch({
        type: DELETE_TODO_REQUEST,
    });

    return API.delete(`/api/todos/${id}`)
        .then((response) => {
            dispatch({
                type: DELETE_TODO_SUCCESS,
                payload: response.data.id,
            });

            return response;
        })
        .catch((error) => {
            const allErrors = error?.response?.data?.errors;

            if (allErrors) {
                const errors = {};
                Object.entries(allErrors).forEach(([key, value]) => {
                    errors[key] = value[0];
                });

                dispatch({
                    type: DELETE_TODO_FAILED,
                    payload: errors,
                });
            }

            return error;
        });
};

export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR_MESSAGE,
    });
};
