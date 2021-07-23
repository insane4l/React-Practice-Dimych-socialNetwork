import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';

import profilePageReducer from './reducers/profilePageReducer';
import messagesPageReducer from './reducers/messagesPageReducer';
import usersPageReducer from './reducers/usersPageReducer';
import authReducer from './reducers/authReducer';
import {reducer as formReducer} from 'redux-form';
import appReducer from './reducers/appReducer';



const reducers = combineReducers({
    messagesPage: messagesPageReducer,
    profilePage: profilePageReducer,
    usersPage: usersPageReducer,
    app: appReducer,
    auth: authReducer,
    form: formReducer
});

// options for Redux DevTools (chrome extention)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// without support Redux DevTools
// const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;