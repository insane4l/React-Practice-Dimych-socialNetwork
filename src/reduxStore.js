import {createStore, combineReducers} from 'redux';
import profilePageReducer from './reducers/profilePageReducer';
import messagesPageReducer from './reducers/messagesPageReducer';
import friendsPageReducer from './reducers/friendsPageReducer';
import authReducer from './reducers/authReducer';

const reducers = combineReducers({
    messagesPage: messagesPageReducer,
    profilePage: profilePageReducer,
    friendsPage: friendsPageReducer,
    auth: authReducer
})

const store = createStore(reducers);

window.store = store;
export default store;