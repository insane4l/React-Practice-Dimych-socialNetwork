import { BaseThunkType, InferActionsTypes } from "../reduxStore"
import { ResultCodesEnum } from "../services/API"
import { AllDialogsListItemType, dialogsAPI, DialogMessageType } from "../services/dialogsAPI"
import { usersAPI } from "../services/usersAPI"
import { ProfileType, RequestErrorHandlingType } from "../types/types"


const initialState = {
    dialogsList: [] as AllDialogsListItemType[],
    selectedDialogMessages: [] as DialogMessageType[],
    selectedDialogMessagesCount: 0,
    dialogInterlocuterProfile: null as null | ProfileType,
    viewedMessages: [] as string[],
    newDialogsMessagesCount: 0,
    isLoading: false,
    requestErrors: {
        requestingMessagesError: null as null | string,
        sendingMessageError: null as null | string,
        messageStatusRequestError: null as null | string,
        newMessagesCountRequestError: null as null | string
    }
}
type InitialStateType = typeof initialState


const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'sn/dialogs/DIALOGS_LIST_RECEIVED':
            return {
                ...state,
                dialogsList: action.payload.dialogsList
            };
        case 'sn/dialogs/DIALOG_MESSAGES_RECEIVED':
            return {
                ...state,
                selectedDialogMessages: [...action.payload.dialogMessages, ...state.selectedDialogMessages]
            };
        case 'sn/dialogs/DIALOG_MESSAGES_CLEANED':
            return {
                ...state,
                selectedDialogMessages: [],
                selectedDialogMessagesCount: 0
            };
        case 'sn/dialogs/SET_DIALOG_MESSAGES_COUNT':
            return {
                ...state,
                selectedDialogMessagesCount: action.payload.dialogMessagesCount
            };
        case 'sn/dialogs/INTERLOCUTER_PROFILE_RECEIVED':
            return {
                ...state,
                dialogInterlocuterProfile: action.payload.profile
            };
        case 'sn/dialogs/MESSAGE_SENT':
            return {
                ...state,
                selectedDialogMessages: [...state.selectedDialogMessages, action.payload.message] 
            };
        case 'sn/dialogs/ADD_MESSAGE_TO_VIEWED':
            return {
                ...state,
                viewedMessages: [...state.viewedMessages,  action.payload.messageId] 
            };
        case 'sn/dialogs/DEL_MESSAGE_FROM_VIEWED':
            return {
                ...state,
                viewedMessages: state.viewedMessages.filter( id => id !== action.payload.messageId)
            };
        case 'sn/dialogs/NEW_MESSAGES_COUNT_RECEIVED':
            return {
                ...state,
                newDialogsMessagesCount: action.payload.newMessagesCount
            };
        case 'sn/dialogs/SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload.status
            };
        // case 'sn/dialogs/SET_REQUESTING_MESSAGES_ERROR':
        //     return {
        //         ...state,
        //         requestErrors: {...state.requestErrors, requestingMessagesError: action.payload.error}
        //     };
        // case 'sn/dialogs/SET_SENDING_MESSAGE_ERROR':
        //     return {
        //         ...state,
        //         requestErrors: {...state.requestErrors, sendingMessageError: action.payload.error}
        //     };
        // case 'sn/dialogs/SET_MESSAGE_STATUS_REQUEST_ERROR':
        //     return {
        //         ...state,
        //         requestErrors: {...state.requestErrors, messageStatusRequestError: action.payload.error}
        //     };
        // case 'sn/dialogs/SET_NEW_MESSAGES_COUNT_REQUEST_ERROR':
        //     return {
        //         ...state,
        //         requestErrors: {...state.requestErrors, newMessagesCountRequestError: action.payload.error}
        //     };
        case 'sn/dialogs/SET_REQUEST_ERROR':
            return {
                ...state,
                requestErrors: {...state.requestErrors, ...action.payload.error}
            };
        default:
            return state;
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    dialogsListReceived: (dialogsList: AllDialogsListItemType[]) => (
        {type: 'sn/dialogs/DIALOGS_LIST_RECEIVED', payload: {dialogsList}} as const
    ),
    dialogMessagesReceived: (dialogMessages: DialogMessageType[]) => (
        {type: 'sn/dialogs/DIALOG_MESSAGES_RECEIVED', payload: {dialogMessages}} as const
    ),
    dialogMessagesCleaned: () => (
        {type: 'sn/dialogs/DIALOG_MESSAGES_CLEANED'} as const
    ),
    setDialogMessagesCount: (dialogMessagesCount: number) => (
        {type: 'sn/dialogs/SET_DIALOG_MESSAGES_COUNT', payload: {dialogMessagesCount}} as const
    ),
    messageSent: (message: DialogMessageType) => (
        {type: 'sn/dialogs/MESSAGE_SENT', payload: {message}} as const
    ),
    addMessageToViewed: (messageId: string) => (
        {type: 'sn/dialogs/ADD_MESSAGE_TO_VIEWED', payload: {messageId} } as const
    ),
    delMessageFromViewed: (messageId: string) => (
        {type: 'sn/dialogs/DEL_MESSAGE_FROM_VIEWED', payload: {messageId} } as const
    ),
    newMessagesCountReceived: (newMessagesCount: number) => (
        {type: 'sn/dialogs/NEW_MESSAGES_COUNT_RECEIVED', payload: {newMessagesCount} } as const
    ),
    setIsLoading: (status: boolean) => (
        {type: 'sn/dialogs/SET_IS_LOADING', payload: {status}} as const
    ),
    interlocuterProfileReceived: (profile: ProfileType | null) => (
        {type: 'sn/dialogs/INTERLOCUTER_PROFILE_RECEIVED', payload: {profile}} as const
    ),
    // setRequestingMessagesError: (error: null | string) => (
    //     {type: 'sn/dialogs/SET_REQUESTING_MESSAGES_ERROR', payload: {error}} as const
    // ),
    // setSendingMessageError: (error: null | string) => (
    //     {type: 'sn/dialogs/SET_SENDING_MESSAGE_ERROR', payload: {error}} as const
    // ),
    // setMessageStatusRequestError: (error: null | string) => (
    //     {type: 'sn/dialogs/SET_MESSAGE_STATUS_REQUEST_ERROR', payload: {error}} as const
    // ),
    // setNewMessagesCountRequestError: (error: null | string) => (
    //     {type: 'sn/dialogs/SET_NEW_MESSAGES_COUNT_REQUEST_ERROR', payload: {error}} as const
    // ),
    setRequestError: (error: RequestErrorHandlingType) => (
        {type: 'sn/dialogs/SET_REQUEST_ERROR', payload: {error}} as const
    )
}


export const requestAllDialogsList = (): BaseThunkType<ActionsTypes> => async (dispatch) => {
    dispatch( actions.setIsLoading(true) )
    const dialogs = await dialogsAPI.getAllDialogsList()
    dispatch( actions.setIsLoading(false) )
    dispatch( actions.dialogsListReceived(dialogs) )
}


export const requestDialogMessages = (userId: number, pageNumber: number, pageSize: number): BaseThunkType<ActionsTypes> => async (dispatch) => {
    dispatch( actions.setIsLoading(true) )
    const res = await dialogsAPI.getUserMessagesList(userId, pageNumber, pageSize)
    const profile = await usersAPI.getUserProfile(userId)

    if (res.error === null) {
        dispatch( actions.setRequestError({requestingMessagesError: null}) )
        dispatch( actions.setIsLoading(false) )

        dispatch( actions.dialogMessagesReceived(res.items) )
        dispatch( actions.setDialogMessagesCount(res.totalCount) )
        dialogsAPI.setDialogAtTheDialogsListTop(userId)
        dispatch( requestNewMessagesCount() )
        dispatch( actions.interlocuterProfileReceived(profile) )
    } else {
        dispatch( actions.setRequestError({requestingMessagesError: 'Failed to load messages. Please try refresh the page'}) )
    }
}


export const sendMessage = (userId: number, message: string): BaseThunkType<ActionsTypes> => async (dispatch) => {
    // dispatch( actions.setIsLoading(true) )
    const res = await dialogsAPI.sendMessageToUser(userId, message)
    // dispatch( actions.setIsLoading(false) )
    if (res.resultCode === ResultCodesEnum.Success) {
        dispatch( actions.setRequestError({sendingMessageError: null}) )
        const sentMessage = {
            addedAt: res.data.message.addedAt,
            body: res.data.message.body,
            id: res.data.message.id,
            recipientId: res.data.message.recipientId,
            senderId: res.data.message.senderId,
            senderName: res.data.message.senderName,
            translatedBody: res.data.message.translatedBody,
            viewed: res.data.message.viewed
        }
        dispatch( actions.messageSent(sentMessage) )
    } else {
        dispatch( actions.setRequestError({sendingMessageError: 'An error has occurred. The message was not sent. Please try refresh the page'}) )
    }
    
}




export const requestMessageStatus = (messageId: string): BaseThunkType<ActionsTypes> => async (dispatch) => {
    try {
        const status = await dialogsAPI.getMessageViewedStatus(messageId)
        dispatch( actions.setRequestError({messageStatusRequestError: null}) )

        if (status === true) {
            dispatch( actions.addMessageToViewed(messageId) )
        }  
    } catch {
        dispatch( actions.setRequestError({messageStatusRequestError: 'An error has occurred. The message status cannot be shown. Please try to click again'}) )
    }  
}


export const requestNewMessagesCount = (): BaseThunkType<ActionsTypes> => async (dispatch) => {
    try {
        const newMessagesCount = await dialogsAPI.getNewMessagesTotalCount()
        dispatch( actions.setRequestError({newMessagesCountRequestError: null}) )

        dispatch( actions.newMessagesCountReceived(newMessagesCount) )
    } catch {
        dispatch( actions.setRequestError({newMessagesCountRequestError: '?'}) )
    }  
}


export default dialogsReducer




// todo: how to type by object keys
// type ErrorKeyTypes = keyof typeof initialState.requestErrors
// type ErrorValueType = null | string
// type ErrorType = Record<ErrorKeyTypes, ErrorValueType>
// actions.setError({newMessagesCountRequestError: null} as any) // without any:
// An argument of type "{newMessagesCountRequestError: null;}" cannot be assigned a parameter of type "ErrorType".
// The type "{newMessagesCountRequestError: null;}" is missing the following properties from the type "ErrorType": requestingMessagesError, sendMessageError, messageStatusRequestErrorts (2345)