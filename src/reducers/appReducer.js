import {setUserAuthData} from "./authReducer";

const AUTHORIZED_SUCCESSFULLY = 'sn/app/AUTHORIZED_SUCCESSFULLY';

const initialState = {
    appInitialized: false
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTHORIZED_SUCCESSFULLY:
            return {
                ...state,
                appInitialized: true
            };
        default:
            return state;
    }
}



export const initializedSuccessfully = () => ({type: AUTHORIZED_SUCCESSFULLY});


export const initializeApp = () => async (dispatch) => {
    await dispatch(setUserAuthData());
    dispatch(initializedSuccessfully());
}


export default appReducer;