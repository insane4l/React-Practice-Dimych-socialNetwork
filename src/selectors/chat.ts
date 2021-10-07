import {AppStateType} from '../reduxStore'

export const getStatus = (state: AppStateType) => {
    return state.chat.status
}

export const getMessages = (state: AppStateType) => {
    return state.chat.messages
}