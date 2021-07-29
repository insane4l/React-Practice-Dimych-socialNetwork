import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'

import profilePageReducer from './reducers/profilePageReducer'
import messagesPageReducer from './reducers/messagesPageReducer'
import usersPageReducer from './reducers/usersPageReducer'
import authReducer from './reducers/authReducer'
import {reducer as formReducer} from 'redux-form'
import appReducer from './reducers/appReducer'



const rootReducer = combineReducers({
    messagesPage: messagesPageReducer,
    profilePage: profilePageReducer,
    usersPage: usersPageReducer,
    app: appReducer,
    auth: authReducer,
    form: formReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>


// options for Redux DevTools (chrome extention)
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// without support Redux DevTools
// const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store
export default store