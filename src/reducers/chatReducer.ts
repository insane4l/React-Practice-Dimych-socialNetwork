import { Dispatch } from "redux"
import { BaseThunkType, InferActionsTypes } from "../reduxStore"
import { chatAPI, WSStatusType } from "../services/chatAPI"
import { ChatMessageType } from "../types/types"



const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as WSStatusType
}


const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'sn/CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages].filter((m, index, array) => index >= (array.length - 100))
            }
        case 'sn/CHAT/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        case 'sn/CHAT/MESSAGES_CLEANED':
            return {
                ...state,
                messages: []
            }
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => (
        {type: 'sn/CHAT/MESSAGES_RECEIVED', payload: {messages}} as const
    ),
    statusChanged: (status: WSStatusType) => (
        {type: 'sn/CHAT/STATUS_CHANGED', payload: {status}} as const
    ),
    messagesCleaned: () => (
        {type: 'sn/CHAT/MESSAGES_CLEANED'} as const
    )

}




let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null // because need exactly that link when subscriber unsubscribes
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch( actions.messagesReceived(messages) )
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: WSStatusType) => void) | null = null // because need exactly that link when subscriber unsubscribes
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch( actions.statusChanged(status) )
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = ():BaseThunkType<ActionsTypes> => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = ():BaseThunkType<ActionsTypes> => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}


export const sendMessage = (message: string):BaseThunkType<ActionsTypes> => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer


type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>