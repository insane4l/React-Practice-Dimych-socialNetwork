import {authAPI} from '../services/snAPI';
import {stopSubmit} from 'redux-form';

const SET_AUTH_DATA = 'sn/auth/SET_AUTH_DATA';
const SET_CAPTCHA_IMG = 'sn/auth/SET_CAPTCHA_IMG';

const initialState = {
    email: null as boolean | null,
    id: null as number | null,
    login: null as string | null,
    isAuthorized: false,
    captchaUrl: null as string | null
}

// type InitialStateType = {
//     email: boolean | null,
//     id: number | null,
//     login: string | null,
//     isAuthorized: boolean,
//     captchaUrl: string | null
// }

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch(action.type) {
        case SET_AUTH_DATA:
        case SET_CAPTCHA_IMG:
            return {...state, ...action.payload};
        default:
            return state;
    }
}



type SetAuthDataActionPayloadType = {
    email: string | null,
    id: number | null,
    login: string | null,
    isAuthorized: boolean | null
}
type SetAuthDataActionType = {
    type: typeof SET_AUTH_DATA,
    payload: SetAuthDataActionPayloadType
}
export const setAuthData = (email: string | null, id: number | null, login: string | null, isAuthorized: boolean): SetAuthDataActionType => ({ 
    type: SET_AUTH_DATA, payload: {email, id, login, isAuthorized} 
});


type SetCaptchaImgActionType = {
    type: typeof SET_CAPTCHA_IMG,
    payload: {captchaUrl: string}
}
export const setCaptchaImg = (captchaUrl: string): SetCaptchaImgActionType => ({type: SET_CAPTCHA_IMG, payload: {captchaUrl} })




export const setUserAuthData = () => async (dispatch: any) => {
    const response = await authAPI.getUserAuthData();
    const {email, id, login} = response.data.data;

    if(response.data.resultCode === 0) {
        dispatch(setAuthData(email, id, login, true));
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await authAPI.getCaptchaImg();
    dispatch(setCaptchaImg(response.data.url));
}


export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
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

export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout();
        
    if (response.data.resultCode === 0) {
        dispatch(setAuthData(null, null, null, false));
    }
}

export default authReducer;