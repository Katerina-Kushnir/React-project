import React from "react";
import { applyMiddleware } from "redux";
import { createStore, combineReducers} from 'redux';
import thunk from "redux-thunk";
import { appReduser } from "./App/reduser";

const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

export const store = createStore(combineReducers({
    todo: appReduser,
}), applyMiddleware(logger, thunk));

