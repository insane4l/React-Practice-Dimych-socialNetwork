import {authAPI, ResultCodeForCaptchaEnum, ResultCodesEnum} from '../services/snAPI';
import {stopSubmit} from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from '../reduxStore';

const SET_AUTH_DATA = 'sn/auth/SET_AUTH_DATA';
const SET_CAPTCHA_IMG = 'sn/auth/SET_CAPTCHA_IMG';

const initialState = {
    email: null as string | null,
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

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case SET_AUTH_DATA:
            return {...state, ...action.payload};
        case SET_CAPTCHA_IMG:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

type ActionsTypes = SetAuthDataActionType | SetCaptchaImgActionType


type SetAuthDataActionPayloadType = {
    email: string | null,
    id: number | null,
    login: string | null,
    isAuthorized: boolean
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



type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const setUserAuthData = (): ThunkType => async (dispatch) => {
    const meData = await authAPI.getUserAuthData();
    const {email, id, login} = meData.data;

    if(meData.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthData(email, id, login, true));
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await authAPI.getCaptchaImg();
    dispatch(setCaptchaImg(data.url));
}


export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setUserAuthData());
    } else if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrl())
    } else {
        const errorMessage = data.messages.length > 0 ? data.messages[0] : "Some error";
        // @ts-ignore
        dispatch(stopSubmit("login", {_error: errorMessage} ))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    const data = await authAPI.logout();
        
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthData(null, null, null, false));
    }
}

export default authReducer;