import {createStore, combineReducers} from 'redux';
import profilePageReducer from './reducers/profilePageReducer';
import messagesPageReducer from './reducers/messagesPageReducer';
import friendsPageReducer from './reducers/friendsPageReducer';

const reducers = combineReducers({
    messagesPage: messagesPageReducer,
    profilePage: profilePageReducer,
    friendsPage: friendsPageReducer
})

const store = createStore(reducers);

window.store = store;
export default store;