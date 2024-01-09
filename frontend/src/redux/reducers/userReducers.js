import { USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAILED } from "../constants";

const initialState = {
    loading: false,
    errors: {},
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_EDIT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case USER_EDIT_FAILED:
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };

        default:
            return state;
    }
};
