import {apiBase, ResponseType, ResultCodesEnum, ResultCodeForCaptchaEnum, } from './API'


export const authAPI = {
    getUserAuthData() {
        return apiBase.get< ResponseType<AuthMeResponseDataType> >(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return apiBase.post<LoginResponseType>('/auth/login', {
            email, password, rememberMe, captcha}).then(res => res.data)
    },
    logout() {
        return apiBase.delete<LogoutResponseType>('auth/login').then(res => res.data)
    },
    getCaptchaImg() {
        return apiBase.get<GetCaptchaResponseType>('security/get-captcha-url').then(res => res.data)
    }
}



type AuthMeResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseType = ResponseType<{userId: number}, 
                                        ResultCodesEnum | ResultCodeForCaptchaEnum>

type LogoutResponseType = {
    resultCode: ResultCodesEnum
}

type GetCaptchaResponseType = {
    url: string
}