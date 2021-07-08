import {authAPI} from '../services/snAPI';

const SET_AUTH_DATA = 'SET_AUTH_DATA';

const initialState = {
    email: null,
    id: null,
    login: null,
    isAuthorized: false
}


const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH_DATA:
            debugger;
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export const setAuthData = (email, id, login, isAuthorized) => ({ type: SET_AUTH_DATA, payload: {email, id, login, isAuthorized} });





export const setUserAuthData = () => {
    return (dispatch) => {
        authAPI.getUserAuthData().then(response => {
            const {email, id, login} = response.data.data;

            if(response.data.resultCode === 0) {
                dispatch(setAuthData(email, id, login, true));
            }
        });
    }
}

export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe).then(response => {

        if (response.data.resultCode === 0) {
            dispatch(setUserAuthData());
        }
    })
}

export const logout = () => (dispatch) => {
    authAPI.logout().then(response => {
        
        if (response.data.resultCode === 0) {
            dispatch(setAuthData(null, null, null, false));
        }
    })
}

export default authReducer;