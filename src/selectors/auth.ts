import {AppStateType} from '../reduxStore'

export const getAuthUserId = (state: AppStateType) => {
    return state.auth.id
}

export const getIsAuthorized = (state: AppStateType) => {
    return state.auth.isAuthorized
}

export const getLogin = (state: AppStateType) => {
    return state.auth.login
}

export const getAuthUserPhoto = (state: AppStateType) => {
    return state.auth.authUserPhoto
}