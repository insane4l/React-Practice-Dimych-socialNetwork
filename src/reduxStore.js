import {createStore, combineReducers} from 'redux';
import profilePageReducer from './reducers/profilePageReducer';
import messagesPageReducer from './reducers/messagesPageReducer';

const reducers = combineReducers({
    messagesPage: messagesPageReducer,
    profilePage: profilePageReducer
})

const store = createStore(reducers);

export default store;