import { BaseThunkType, InferActionsTypes } from "../reduxStore";
import { ResultCodesEnum } from "../services/API";
import { AllDialogsListItemType, dialogsAPI, DialogMessageType, DialogsChatMessageType } from "../services/dialogsAPI";


const initialState = {
    dialogsList: [] as AllDialogsListItemType[],
    selectedDialogMessages: [] as DialogMessageType[],
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
    messageSent: (message: DialogsChatMessageType) => (
        {type: 'sn/dialogs/MESSAGE_SENT', payload: {message}} as const
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
    dispatch( actions.setIsLoading(false) )
    dispatch( actions.dialogMessagesReceived(res.items) )
}




export const sendMessage = (userId: number, message: string): BaseThunkType<ActionsTypes> => async (dispatch) => {
    // dispatch( actions.setIsLoading(true) )
    const res = await dialogsAPI.sendMessageToUser(userId, message)
    // dispatch( actions.setIsLoading(false) )
    if (res.resultCode === ResultCodesEnum.Success) {
        dispatch( actions.messageSent(res.data.message) )
    } else {
        alert('An error has occurred. The message was not sent. Please try refresh the page')
    }
    
}

export default dialogsReducer