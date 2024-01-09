import {
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILED,
    FETCH_TODO_REQUEST,
    FETCH_TODO_SUCCESS,
    FETCH_TODO_FAILED,
    EDIT_TODO_REQUEST,
    EDIT_TODO_SUCCESS,
    EDIT_TODO_FAILED,
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILED,
    CLEAR_ERROR_MESSAGE,
    DELETE_CATGORY_SUCCESS,
} from "../constants";

const initialState = {
    loading: false,
    todos: [],
    errors: {},
};

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: [action.payload, ...state.todos],
            };
        case ADD_TODO_FAILED:
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };

        case FETCH_TODO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: action.payload,
            };
        case FETCH_TODO_FAILED:
            return {
                ...state,
                loading: false,
            };

        case EDIT_TODO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case EDIT_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.payload.id) {
                        return {
                            ...action.payload,
                        };
                    } else {
                        return {
                            ...todo,
                        };
                    }
                }),
            };
        case EDIT_TODO_FAILED:
            return {
                ...state,
                loading: false,
            };
        case DELETE_TODO_REQUEST:
            return {
                ...state,
            };
        case DELETE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload),
            };
        case DELETE_TODO_FAILED:
            return {
                ...state,
            };
        case CLEAR_ERROR_MESSAGE:
            return {
                ...state,
                errors: {},
            };
        case DELETE_CATGORY_SUCCESS:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id === action.payload),
            };

        default:
            return state;
    }
};
