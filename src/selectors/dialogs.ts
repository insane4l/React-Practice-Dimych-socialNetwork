import {AppStateType} from '../reduxStore'

export const getNewDialogsMessagesCount = (state: AppStateType) => {
    return state.dialogsPage.newDialogsMessagesCount
}

export const getViewedMessages = (state: AppStateType) => {
    return state.dialogsPage.viewedMessages
}

export const getSelectedDialogMessages = (state: AppStateType) => {
    return state.dialogsPage.selectedDialogMessages
}

export const getLoadedMessagesCount = (state: AppStateType) => {
    return state.dialogsPage.selectedDialogMessages.length
}

export const getSelectedDialogMessagesCount = (state: AppStateType) => {
    return state.dialogsPage.selectedDialogMessagesCount
}

export const getDialogInterlocuterProfile = (state: AppStateType) => {
    return state.dialogsPage.dialogInterlocuterProfile
}

export const getDialogsList = (state: AppStateType) => {
    return state.dialogsPage.dialogsList
}

export const getIsLoading = (state: AppStateType) => {
    return state.dialogsPage.isLoading
}

export const getNewMessagesCountRequestError = (state: AppStateType) => {
    return state.dialogsPage.requestErrors.newMessagesCountRequestError
}

export const getSendingMessageError = (state: AppStateType) => {
    return state.dialogsPage.requestErrors.sendingMessageError
}

export const getMessageStatusRequestError = (state: AppStateType) => {
    return state.dialogsPage.requestErrors.messageStatusRequestError
}

export const getRequestingMessagesError = (state: AppStateType) => {
    return state.dialogsPage.requestErrors.requestingMessagesError
}