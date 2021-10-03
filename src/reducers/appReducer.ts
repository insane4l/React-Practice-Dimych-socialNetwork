import { BaseThunkType, InferActionsTypes } from "../reduxStore"
import {requestUserAuthData} from "./authReducer"


const initialState = {
    appInitialized: false,
    unhandledError: false
}
type InitialStateType = typeof initialState


const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'sn/app/INITIALIZED_SUCCESSFULLY':
            return {
                ...state,
                appInitialized: true
            };
        case 'sn/app/UNHANDLED_ERROR_CATCHED':
            return {
                ...state,
                unhandledError: action.payload.error
            };
        default:
            return state;
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    initializedSuccessfully: () => (
        {type: 'sn/app/INITIALIZED_SUCCESSFULLY'} as const
    ),
    unhandledErrorCatched: (error: boolean) => (
        {type: 'sn/app/UNHANDLED_ERROR_CATCHED', payload: {error}} as const
    )
}


export const initializeApp = (): BaseThunkType<ActionsTypes> => async (dispatch) => {
    await dispatch(requestUserAuthData());
    dispatch(actions.initializedSuccessfully());
}


export default appReducer