import {authAPI} from '../services/snAPI';
import {stopSubmit} from 'redux-form';

const SET_AUTH_DATA = 'sn/auth/SET_AUTH_DATA';
const SET_CAPTCHA_IMG = 'sn/auth/SET_CAPTCHA_IMG';

const initialState = {
    email: null,
    id: null,
    login: null,
    isAuthorized: false,
    captchaUrl: null 
}


const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH_DATA:
        case SET_CAPTCHA_IMG:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export const setAuthData = (email, id, login, isAuthorized) => ({ type: SET_AUTH_DATA, payload: {email, id, login, isAuthorized} });
export const setCaptchaImg = (captchaUrl) => ({type: SET_CAPTCHA_IMG, payload: {captchaUrl} })




export const setUserAuthData = () => async (dispatch) => {
    const response = await authAPI.getUserAuthData();
    const {email, id, login} = response.data.data;

    if(response.data.resultCode === 0) {
        dispatch(setAuthData(email, id, login, true));
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await authAPI.getCaptchaImg();
    dispatch(setCaptchaImg(response.data.url));
}


export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === 0) {
        dispatch(setUserAuthData());
    } else if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrl())
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