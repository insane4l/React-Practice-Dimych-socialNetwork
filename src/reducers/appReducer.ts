import { ThunkAction } from "redux-thunk"
import { AppStateType } from "../reduxStore"
import {setUserAuthData} from "./authReducer"

const INITIALIZED_SUCCESSFULLY = 'sn/app/INITIALIZED_SUCCESSFULLY'

const initialState = {
    appInitialized: false
}

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case INITIALIZED_SUCCESSFULLY:
            return {
                ...state,
                appInitialized: true
            };
        default:
            return state;
    }
}

type ActionsTypes = InitializedSuccessfullyActionType

type InitializedSuccessfullyActionType = {
    type: typeof INITIALIZED_SUCCESSFULLY
};
export const initializedSuccessfully = (): InitializedSuccessfullyActionType => ({type: INITIALIZED_SUCCESSFULLY})


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export const initializeApp = (): ThunkType => async (dispatch) => {
    await dispatch(setUserAuthData());
    dispatch(initializedSuccessfully());
}


export default appReducer