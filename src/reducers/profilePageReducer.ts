import { stopSubmit } from 'redux-form';
import {usersAPI, authAPI} from '../services/snAPI';
import {UserPhotosType, ProfileType, MessageType} from '../types/types';

const ADD_NEW_POST = 'sn/profile/ADD_NEW_POST';
const SET_USER = 'sn/profile/SET_USER';
const SET_PROFILE_STATUS = 'sn/profile/SET_PROFILE_STATUS';
const DELETE_POST = 'sn/profile/DELETE_POST';
const SET_PROFILE_PHOTO_SUCCESS = 'sn/profile/SET_PROFILE_PHOTO_SUCCESS';
const SET_PROFILE_DATA_SUCCESS = 'sn/profile/SET_PROFILE_DATA_SUCCESS';




const initialState = {
    messages: [
        {id: 1, label: 'Hi, this is my 1 post', likesCount: 22},
        {id: 2, label: '2 post', likesCount: 12},
        {id: 3, label: 'ok this is 3 post', likesCount: 8}
    ] as Array<MessageType>,
    selectedUser: null as null | ProfileType,
    profileStatus: ""
};

type InitialStateType = typeof initialState;

const profilePageReducer = (state = initialState, action: any): InitialStateType => {
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
        case SET_PROFILE_PHOTO_SUCCESS:
            return {...state, selectedUser: {...state.selectedUser, photos: action.photos} as ProfileType }; // (temporarily "as UserType" because of TS error)
        case SET_PROFILE_DATA_SUCCESS:
            return {...state, selectedUser: {...state.selectedUser, ...action.data}}
        default:
            return state;
    }
}

type AddNewPostActionType = {
    type: typeof ADD_NEW_POST,
    messageBody: string
};
export const addNewPost = (messageBody: string): AddNewPostActionType => ({type: ADD_NEW_POST, messageBody});

type SetUserActionType = {
    type: typeof SET_USER,
    user: ProfileType
}
export const setUserAction = (user: ProfileType): SetUserActionType => ({type: SET_USER, user});

type SetProfileStatusActionType = {
    type: typeof SET_PROFILE_STATUS,
    message: string
}
export const setProfileStatus = (message: string): SetProfileStatusActionType => ({type: SET_PROFILE_STATUS, message});

type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId});

type SetProfilePhotoSuccessActionType = {
    type: typeof SET_PROFILE_PHOTO_SUCCESS,
    photos: UserPhotosType
}
export const setProfilePhotoSuccess = (photos: UserPhotosType): SetProfilePhotoSuccessActionType => ({type: SET_PROFILE_PHOTO_SUCCESS, photos});

type SetProfileDataSuccessActionType = {
    type: typeof SET_PROFILE_DATA_SUCCESS,
    data: ProfileType
}
export const setProfileDataSuccess = (data: ProfileType): SetProfileDataSuccessActionType => ({type: SET_PROFILE_DATA_SUCCESS, data})








export const getUserProfile = (urlParamId: number) => async (dispatch: any) => {
    const response = await authAPI.getUserAuthData();
    const authId = response.data.data.id;
    const userId = urlParamId ? urlParamId : authId;

    const profile = await usersAPI.getUserProfile(userId);
    dispatch(setUserAction(profile.data));
}


export const updateProfilePhoto = (photoFile: any) => async (dispatch: any) => {
    const response = await usersAPI.setProfilePhoto(photoFile);
    debugger;
    if (response.data.resultCode === 0) {
        dispatch(setProfilePhotoSuccess(response.data.data.photos));
    }
}


export const getProfileStatus = (userId: number) => async (dispatch: any) => {
    const response = await usersAPI.getProfileStatus(userId);

    if (response.status === 200) {
        dispatch(setProfileStatus(response.data));
    }
}


export const updateProfileStatus = (message: string) => async (dispatch: any) => {
    const response = await usersAPI.setProfileStatus(message);
    if (response.data.resultCode === 0) {
        dispatch(setProfileStatus(message));
    }
}


export const updateProfileData = (formData: ProfileType) => async (dispatch: any) => {
    const response = await usersAPI.setProfileData(formData);
    
    if(response.data.resultCode === 0) {

        dispatch(setProfileDataSuccess(formData));
    } else {
        const errorMessage = response.data.messages[0];
        dispatch(stopSubmit('profileData', {_error: errorMessage}));
        return Promise.reject(response.data.messages[0]);
    }
}



export default profilePageReducer;