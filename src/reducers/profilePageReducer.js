import {usersAPI, authAPI} from '../services/snAPI';

const ADD_NEW_POST = 'sn/profile/ADD_NEW_POST';
const SET_USER = 'sn/profile/SET_USER';
const SET_PROFILE_STATUS = 'sn/profile/SET_PROFILE_STATUS';
const DELETE_POST = 'sn/profile/DELETE_POST';

const initialState = {
    messages: [
        {id: 1, label: 'Hi, this is my 1 post', likesCount: 22},
        {id: 2, label: '2 post', likesCount: 12},
        {id: 3, label: 'ok this is 3 post', likesCount: 8}
    ],
    selectedUser: null,
    profileStatus: ""
};

const profilePageReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_NEW_POST:
            let length = state.messages.length;
            const id = ++length;
            const newState = {
                ...state,
                messages: [...state.messages, {
                    id,
                    label: action.messageBody,
                    likesCount: 0
                    }]
            };
            return newState;
        case DELETE_POST:
            return {...state,  messages: state.messages.filter(item => item.id !== action.postId)}
        case SET_USER:
            return {...state, selectedUser: action.user};
        case SET_PROFILE_STATUS:
            return {...state, profileStatus: action.message};
        default:
            return state;
    }
}


export const addNewPost = (messageBody) => ({type: ADD_NEW_POST, messageBody});
export const setUserAction = (user) => ({type: SET_USER, user});
export const setProfileStatus = (message) => ({type: SET_PROFILE_STATUS, message});
export const deletePost = (postId) => ({type: DELETE_POST, postId})


export const getUserProfile = (urlParamId) => async (dispatch) => {
    const response = await authAPI.getUserAuthData();
    const authId = response.data.data.id;
    const userId = urlParamId ? urlParamId : authId;

    const profile = await usersAPI.getUserProfile(userId);
    dispatch(setUserAction(profile.data));
}


export const getProfileStatus = (userId) => async (dispatch) => {
    const response = await usersAPI.getProfileStatus(userId);
    dispatch(setProfileStatus(response.data));
}


export const updateProfileStatus = (message) => async (dispatch) => {
    const response = await usersAPI.setProfileStatus(message);
    if (response.data.resultCode === 0) {
        dispatch(setProfileStatus(message));
    }
}



export default profilePageReducer;