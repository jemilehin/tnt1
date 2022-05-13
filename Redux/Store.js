import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {reducers} from "./Member/reducers";

const rootReducers = combineReducers({
   reducers
})

const store = createStore(rootReducers,applyMiddleware(thunk))

export default store