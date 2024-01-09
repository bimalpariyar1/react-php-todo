import { combineReducers } from "redux";
import { authReducer } from "./authReducers";
import { userReducer } from "./userReducers";
import { categoryReducer } from "./categoryReducers";
import { todoReducer } from "./todoReducers";

const reducers = combineReducers({ authReducer, userReducer, categoryReducer, todoReducer });

export default reducers;
