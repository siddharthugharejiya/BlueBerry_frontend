import { applyMiddleware, legacy_createStore } from "redux";
import { thunk } from 'redux-thunk';
import { RootReducer } from "./ComblineReducer";


export const store = legacy_createStore(RootReducer, applyMiddleware(thunk))