import { BaseThunkType, InferActionsTypes } from "../reduxStore";
import { AllDialogsListItemType, dialogsAPI } from "../services/dialogsAPI";


const initialState = {
    dialogsList: [] as AllDialogsListItemType[],
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
    sendMessageAction: (messageBody: string) => (
        {type: 'sn/dialogs/SEND_MESSAGE', messageBody} as const
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


export default dialogsReducer