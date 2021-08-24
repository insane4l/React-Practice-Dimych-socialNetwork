import { Dispatch } from "redux"
import { BaseThunkType, InferActionsTypes } from "../reduxStore"
import { chatAPI, ChatMessageType } from "../services/chatAPI"



const initialState = {
    messages: [] as ChatMessageType[]
}


const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'sn/CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => (
        {type: 'sn/CHAT/MESSAGES_RECEIVED', payload: {messages}} as const
    )
}




let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch( actions.messagesReceived(messages) )
        }
    }

    return _newMessageHandler
}

export const startMessagesListening = ():BaseThunkType<ActionsTypes> => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = ():BaseThunkType<ActionsTypes> => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}


export const sendMessage = (message: string):BaseThunkType<ActionsTypes> => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer


type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>