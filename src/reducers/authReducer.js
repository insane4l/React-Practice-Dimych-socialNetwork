import usersAPI from '../services/usersAPI';

const SET_AUTH_DATA = 'SET_AUTH_DATA';

const initialState = {
    email: null,
    id: null,
    login: null,
    isAuth: false
}


const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH_DATA:
            const isAuth = action.isAuthorized === 0 ? true : false;
            return {...state, ...action.data, isAuth};
        default:
            return state;
    }
}

export const setAuthData = (email, id, login, isAuthorized) => ({ type: SET_AUTH_DATA, data: {email, id, login}, isAuthorized });





export const setUserAuthData = () => {
    return (dispatch) => {
        usersAPI.getUserAuthData().then(response => {
            const {email, id, login} = response.data.data;
            
            if(response.data.resultCode === 0) {
                dispatch(setAuthData(email, id, login, response.data.resultCode));
            }
        });
    }
}

export default authReducer;