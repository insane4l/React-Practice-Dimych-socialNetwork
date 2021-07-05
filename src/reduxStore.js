import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import profilePageReducer from './reducers/profilePageReducer';
import messagesPageReducer from './reducers/messagesPageReducer';
import friendsPageReducer from './reducers/friendsPageReducer';
import authReducer from './reducers/authReducer';
import {reducer as formReducer} from 'redux-form';

const reducers = combineReducers({
    messagesPage: messagesPageReducer,
    profilePage: profilePageReducer,
    friendsPage: friendsPageReducer,
    auth: authReducer,
    form: formReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;