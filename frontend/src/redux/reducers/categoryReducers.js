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

const initialState = {
    loading: {
        status: false,
        type: "",
    },
    categories: [],
    errors: {},
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CATGORY_REQUEST:
            return {
                ...state,
                loading: {
                    status: true,
                    type: action.payload,
                },
            };
        case ADD_CATGORY_SUCCESS:
            return {
                ...state,
                loading: {
                    status: false,
                },
                categories: [action.payload, ...state.categories],
            };
        case ADD_CATGORY_FAILED:
            return {
                ...state,
                loading: {
                    status: false,
                },
                errors: action.payload,
            };
        case EDIT_CATGORY_REQUEST:
            return {
                ...state,
                loading: {
                    status: true,
                    type: action.payload,
                },
            };
        case EDIT_CATGORY_SUCCESS:
            return {
                ...state,
                loading: {
                    status: false,
                    type: "",
                },

                categories: state.categories.map((item) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...action.payload,
                        };
                    } else {
                        return {
                            ...item,
                        };
                    }
                }),
            };
        case EDIT_CATGORY_FAILED:
            return {
                ...state,
                loading: {
                    status: false,
                },
                errors: action.payload,
            };
        case DELETE_CATGORY_REQUEST:
            return {
                ...state,
                loading: {
                    status: true,
                    type: action.payload,
                },
            };
        case DELETE_CATGORY_SUCCESS:
            return {
                ...state,
                loading: {
                    status: false,
                    type: "",
                },
                categories: state.categories.filter((item) => item.id !== action.payload),
            };
        case DELETE_CATGORY_FAILED:
            return {
                ...state,
            };
        case FETCH_CATGORY_REQUEST:
            return {
                ...state,
            };
        case FETCH_CATGORY_SUCCESS:
            return {
                ...state,
                categories: action.payload,
            };
        case FETCH_CATGORY_FAILED:
            return {
                ...state,
            };

        default:
            return state;
    }
};
