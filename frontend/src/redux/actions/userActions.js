import { USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAILED } from "../constants";

import API from "services/api";

export const editUser = (formValues) => (dispatch) => {
    dispatch({
        type: USER_EDIT_REQUEST,
    });

    const userDetails = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();

    Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
    });
    formData.append("_method", "PUT");

    return API.post(`/api/update-user/${userDetails.id}`, formData)
        .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            dispatch({
                type: USER_EDIT_SUCCESS,
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
                    type: USER_EDIT_FAILED,
                    payload: errors,
                });
            }

            return error;
        });
};
