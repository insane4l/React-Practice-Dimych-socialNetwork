import { BaseThunkType, InferActionsTypes } from "../reduxStore";
import { ResultCodesEnum } from "../services/API";
import { AllDialogsListItemType, dialogsAPI, DialogMessageType } from "../services/dialogsAPI";


const initialState = {
    dialogsList: [] as AllDialogsListItemType[],
    selectedDialogMessages: [] as DialogMessageType[],
    viewedMessages: [] as string[],
    isLoading: false
}


type InitialStateType = typeof initialState;


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
                selectedDialogMessages: action.payload.dialogMessages
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
        case 'sn/dialogs/SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload.status
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
    messageSent: (message: DialogMessageType) => (
        {type: 'sn/dialogs/MESSAGE_SENT', payload: {message}} as const
    ),
    addMessageToViewed: (messageId: string) => (
        {type: 'sn/dialogs/ADD_MESSAGE_TO_VIEWED', payload: {messageId} } as const
    ),
    delMessageFromViewed: (messageId: string) => (
        {type: 'sn/dialogs/DEL_MESSAGE_FROM_VIEWED', payload: {messageId} } as const
    ),
    setIsLoading: (status: boolean) => (
        {type: 'sn/dialogs/SET_IS_LOADING', payload: {status}} as const
    )
}


export const requestAllDialogsList = (): BaseThunkType<ActionsTypes> => async (dispatch) => {
    dispatch( actions.setIsLoading(true) )
    const dialogs = await dialogsAPI.getAllDialogsList()
    dispatch( actions.setIsLoading(false) )
    dispatch( actions.dialogsListReceived(dialogs) )
}


export const requestDialogMessages = (userId: number): BaseThunkType<ActionsTypes> => async (dispatch) => {
    dispatch( actions.setIsLoading(true) )
    const res = await dialogsAPI.getUserMessagesList(userId, 10, 1)
    if (res.error === null) {
        dispatch( actions.setIsLoading(false) )
        dispatch( actions.dialogMessagesReceived(res.items) )
        dialogsAPI.setDialogAtTheDialogsListTop(userId)
    } else {
        alert('Failed to load messages. Please try refresh the page')
    }
}



export const sendMessage = (userId: number, message: string): BaseThunkType<ActionsTypes> => async (dispatch) => {
    // dispatch( actions.setIsLoading(true) )
    const res = await dialogsAPI.sendMessageToUser(userId, message)
    // dispatch( actions.setIsLoading(false) )
    if (res.resultCode === ResultCodesEnum.Success) {
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
        alert('An error has occurred. The message was not sent. Please try refresh the page')
    }
    
}

// type viewedStatusItemType = {
//     [index: string]: boolean;
// }
export const requestMessageStatus = (messageId: string): BaseThunkType<ActionsTypes> => async (dispatch) => {
    try {
        const status = await dialogsAPI.getMessageViewedStatus(messageId)

        // const viewedStatusItem: viewedStatusItemType = {}
        // viewedStatusItem[messageId] = status
        if (status === true) {
            dispatch( actions.addMessageToViewed(messageId) )
        }
        
    } catch {
        alert('An error has occurred. The message status cannot be shown. Please try to click again')
    }
    
}


export default dialogsReducer