import { createStore, combineReducers } from "redux";

const rootReducers = combineReducers({
    
})

const reducer = (state = {},action) => {
    switch (action.type) {
        case 'SIGNIN_SUCCESS':
            return {
                user: action.payload.user,
                token: action.payload.token
            }
        case 'SIGNUP_SUCCESS':
            return{
                user: action.payload.user
            }
        case 'SIGNUP_FAILURE':
            return {}
        case 'SIGNOUT_SUCCESS':
            return {}
        default:
            return state;
        }
}

let store = createStore(reducer)