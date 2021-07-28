import {setUserAuthData} from "./authReducer";

const INITIALIZED_SUCCESSFULLY = 'sn/app/INITIALIZED_SUCCESSFULLY';

const initialState = {
    appInitialized: false
};

type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: any): InitialStateType => {
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


type InitializedSuccessfullyActionType = {
    type: typeof INITIALIZED_SUCCESSFULLY
};
export const initializedSuccessfully = (): InitializedSuccessfullyActionType => ({type: INITIALIZED_SUCCESSFULLY});


export const initializeApp = () => async (dispatch: any) => {
    await dispatch(setUserAuthData());
    dispatch(initializedSuccessfully());
}


export default appReducer;