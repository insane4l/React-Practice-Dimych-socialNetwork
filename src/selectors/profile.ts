import {AppStateType} from '../reduxStore'

export const getSelectedProfile = (state: AppStateType) => {
    return state.profilePage.selectedProfile
}

export const getSelectedProfileFollowedInfo = (state: AppStateType) => {
    return state.profilePage.selectedProfileFollowedInfo
}

export const getProfileStatus = (state: AppStateType) => {
    return state.profilePage.profileStatus
}

export const getUpdateProfileStatusError = (state: AppStateType) => {
    return state.profilePage.requestErrors.updateProfileStatusError
}
