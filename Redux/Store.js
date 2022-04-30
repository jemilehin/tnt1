import { createStore, combineReducers } from "redux";
import reducers from "./Member/reducers";

const rootReducers = combineReducers({
   reducer: reducers
})

const store = () => {
    return createStore(rootReducers)
}

export default store