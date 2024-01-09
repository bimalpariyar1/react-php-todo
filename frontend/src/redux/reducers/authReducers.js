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

const initialState = {
    loading: false,
    errors: {
        message: "",
    },
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case USER_LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };

        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case USER_REGISTER_FAILED:
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };

        case CLEAR_ERROR_MESSAGE:
            return {
                ...state,
                errors: action.payload,
            };

        case LOGOUT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case LOGOUT_FAILED:
            return {
                ...state,
                loading: false,
            };

        default:
            return state;
    }
};
