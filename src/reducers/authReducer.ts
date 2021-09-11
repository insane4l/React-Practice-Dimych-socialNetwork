import {ResultCodeForCaptchaEnum, ResultCodesEnum} from '../services/API'
import { authAPI } from '../services/authAPI'
import {FormAction, stopSubmit} from 'redux-form'
import { BaseThunkType, InferActionsTypes } from '../reduxStore'
import { usersAPI } from '../services/usersAPI'


const initialState = {
    email: null as string | null,
    id: null as number | null,
    login: null as string | null,
    authUserPhoto: null as string | null,
    isAuthorized: false,
    captchaUrl: null as string | null
}
type InitialStateType = typeof initialState;


const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'sn/auth/SET_AUTH_DATA':
            return {...state, ...action.payload};
        case 'sn/auth/SET_AUTH_USER_PHOTO':
            return {...state, authUserPhoto: action.payload.photo};
        case 'sn/auth/SET_CAPTCHA_IMG':
            return {...state, ...action.payload};
        default:
            return state;
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    setAuthData: (email: string | null, id: number | null, login: string | null, isAuthorized: boolean) => (
        { type: 'sn/auth/SET_AUTH_DATA', payload: {email, id, login, isAuthorized} } as const
    ),
    setAuthUserPhoto: (photo: string) => (
        {type: 'sn/auth/SET_AUTH_USER_PHOTO', payload: {photo} } as const
    ),
    setCaptchaImg: (captchaUrl: string) => (
        {type: 'sn/auth/SET_CAPTCHA_IMG', payload: {captchaUrl} } as const
    )
}

export const requestAuthUserPhoto = (userId: number): BaseThunkType<ActionsTypes> => async (dispatch) => {
    const authProfile = await usersAPI.getUserProfile(userId)
    const photo = authProfile.photos.small

    if (photo) {
        dispatch( actions.setAuthUserPhoto(photo) )
    }
}

export const requestUserAuthData = (): BaseThunkType<ActionsTypes> => async (dispatch) => {
    const meData = await authAPI.getUserAuthData()
    const {email, id, login} = meData.data

    if(meData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthData(email, id, login, true))
        dispatch( requestAuthUserPhoto(id) )
    }

}


export const getCaptchaUrl = (): BaseThunkType<ActionsTypes> => async (dispatch) => {
    const data = await authAPI.getCaptchaImg()
    dispatch(actions.setCaptchaImg(data.url))
}


type WithAnotherActionsThunkType = BaseThunkType<ActionsTypes | FormAction>
export const login = (email: string, password: string, rememberMe: boolean,
                    captcha: string): WithAnotherActionsThunkType => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha)

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(requestUserAuthData())
    } else if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrl())
    } else {
        const errorMessage = data.messages.length > 0 ? data.messages[0] : "Some error"

        dispatch(stopSubmit("login", {_error: errorMessage} )) // action not from ActionsTypes
    }
}


export const logout = (): BaseThunkType<ActionsTypes> => async (dispatch) => {
    const data = await authAPI.logout()
        
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthData(null, null, null, false))
    }
}

export default authReducer