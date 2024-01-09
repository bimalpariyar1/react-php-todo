import {
    ADD_CATGORY_REQUEST,
    ADD_CATGORY_SUCCESS,
    ADD_CATGORY_FAILED,
    EDIT_CATGORY_REQUEST,
    EDIT_CATGORY_SUCCESS,
    EDIT_CATGORY_FAILED,
    DELETE_CATGORY_REQUEST,
    DELETE_CATGORY_SUCCESS,
    DELETE_CATGORY_FAILED,
    FETCH_CATGORY_REQUEST,
    FETCH_CATGORY_SUCCESS,
    FETCH_CATGORY_FAILED,
} from "../constants";

import API from "services/api";

export const addCategory = (option) => (dispatch) => {
    dispatch({
        type: ADD_CATGORY_REQUEST,
        payload: option.type,
    });
    return API.post("/api/categories", option.formValues)
        .then((response) => {
            dispatch({
                type: ADD_CATGORY_SUCCESS,
                payload: response.data.category,
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
                    type: ADD_CATGORY_FAILED,
                    payload: errors,
                });
            }

            return error;
        });
};

export const fetchCategories = () => (dispatch) => {
    dispatch({
        type: FETCH_CATGORY_REQUEST,
    });

    return API.get("/api/categories")
        .then((response) => {
            dispatch({
                type: FETCH_CATGORY_SUCCESS,
                payload: response.data.categories,
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
                    type: FETCH_CATGORY_FAILED,
                    payload: errors,
                });
            }

            return error;
        });
};

export const editCategory = (option) => (dispatch) => {
    dispatch({
        type: EDIT_CATGORY_REQUEST,
        payload: option.type,
    });

    return API.put(`/api/categories/${option.formValues.id}`, {
        ...option.formValues,
    })
        .then((response) => {
            dispatch({
                type: EDIT_CATGORY_SUCCESS,
                payload: response.data.category,
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
                    type: EDIT_CATGORY_FAILED,
                    payload: errors,
                });
            }

            return error;
        });
};

export const deleteCategory = (option) => (dispatch) => {
    dispatch({
        type: DELETE_CATGORY_REQUEST,
        payload: option.type,
    });

    return API.delete(`/api/categories/${option.category.id}`)
        .then((response) => {
            dispatch({
                type: DELETE_CATGORY_SUCCESS,
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
                    type: DELETE_CATGORY_FAILED,
                    payload: errors,
                });
            }

            return error;
        });
};
