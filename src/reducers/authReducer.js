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
            return {...state, email: action.email, id: action.id, login: action.login, isAuth: true};
        default:
            return state;
    }
}

export const setAuthData = (email, id, login) => ({ type: SET_AUTH_DATA, email, id, login });

export default authReducer;