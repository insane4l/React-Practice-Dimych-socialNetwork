import {createStore, combineReducers, applyMiddleware, compose, Action} from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'

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


// type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
// export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> =ReturnType<PropertiesTypes<T>>
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never


export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>



// options for Redux DevTools (chrome extention)
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// without support Redux DevTools
// const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store
export default store