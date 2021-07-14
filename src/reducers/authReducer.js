import {authAPI} from '../services/snAPI';
import {stopSubmit} from 'redux-form';

const SET_AUTH_DATA = 'sn/auth/SET_AUTH_DATA';

const initialState = {
    email: null,
    id: null,
    login: null,
    isAuthorized: false
}


const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH_DATA:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export const setAuthData = (email, id, login, isAuthorized) => ({ type: SET_AUTH_DATA, payload: {email, id, login, isAuthorized} });





export const setUserAuthData = () => async (dispatch) => {
    const response = await authAPI.getUserAuthData();
    const {email, id, login} = response.data.data;

    if(response.data.resultCode === 0) {
        dispatch(setAuthData(email, id, login, true));
    }
}


export const login = (email, password, rememberMe) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe);

    if (response.data.resultCode === 0) {
        dispatch(setUserAuthData());
    } else {
        const errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: errorMessage} ))
    }
}

export const logout = () => async (dispatch) => {
    const response = await authAPI.logout();
        
    if (response.data.resultCode === 0) {
        dispatch(setAuthData(null, null, null, false));
    }
}

export default authReducer;