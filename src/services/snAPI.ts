import axios from 'axios';
import { ProfileType, UserPhotosType, UserType } from '../types/types';

const apiBase = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "e88bb7e6-af23-49e2-8781-5099f9ee4dd5"
    }
})


export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}

type SetProfilePhotoResponseType = {
    data: UserPhotosType
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type DefaultResponseType = {
    data: any
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const usersAPI = {

    getUsers(pageSize: number, currentPage: number) {
        return apiBase.get<GetUsersResponseType>(`users?count=${pageSize}&page=${currentPage}`).then(res => res.data)
    },

    setProfilePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile)

        return apiBase.put<SetProfilePhotoResponseType>('profile/photo', formData).then(res => res.data)
    },

    setProfileData(data: ProfileType) {
        return apiBase.put<DefaultResponseType>('profile', data).then(res => res.data)
    },

    getUserProfile(userId: number) {
        return apiBase.get<ProfileType>(`profile/${userId}`).then(res => res.data)
    },

    getProfileStatus(userId: number) {
        return apiBase.get<string>(`profile/status/${userId}`).then(res => res.data)
    },

    setProfileStatus(message: string) {
        return apiBase.put<DefaultResponseType>('profile/status', {status: message}).then(res => res.data)
    },

    checkFollowStatus(userId: number) {
        return apiBase.get<boolean>(`follow/${userId}`).then(res => res.data)
    },
    followToUser(userId: number) {
        return apiBase.post<DefaultResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollowFromUser(userId: number) {
        return apiBase.delete<DefaultResponseType>(`follow/${userId}`).then(res => res.data)
    },
}


type AuthMeResponseType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {userId: number}
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}

type LogoutResponseType = {
    resultCode: ResultCodesEnum
}

type GetCaptchaResponseType = {
    url: string
}

export const authAPI = {
    getUserAuthData() {
        return apiBase.get<AuthMeResponseType>(`auth/me`).then(res => res.data)
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

