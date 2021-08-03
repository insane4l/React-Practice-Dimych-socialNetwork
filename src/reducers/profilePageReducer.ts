import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from '../reduxStore'
import {usersAPI, authAPI, ResultCodesEnum} from '../services/snAPI'
import {UserPhotosType, ProfileType, MessageType} from '../types/types'

const ADD_NEW_POST = 'sn/profile/ADD_NEW_POST'
const SET_USER = 'sn/profile/SET_USER'
const SET_PROFILE_STATUS = 'sn/profile/SET_PROFILE_STATUS'
const DELETE_POST = 'sn/profile/DELETE_POST'
const SET_PROFILE_PHOTO_SUCCESS = 'sn/profile/SET_PROFILE_PHOTO_SUCCESS'
const SET_PROFILE_DATA_SUCCESS = 'sn/profile/SET_PROFILE_DATA_SUCCESS'




const initialState = {
    messages: [
        {id: 1, label: 'Hi, this is my 1 post', likesCount: 22},
        {id: 2, label: '2 post', likesCount: 12},
        {id: 3, label: 'ok this is 3 post', likesCount: 8}
    ] as Array<MessageType>,
    selectedUser: null as null | ProfileType,
    profileStatus: ""
}

type InitialStateType = typeof initialState

const profilePageReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = AddNewPostActionType | SetUserActionType | SetProfileStatusActionType | DeletePostActionType |
                    SetProfilePhotoSuccessActionType | SetProfileDataSuccessActionType


type AddNewPostActionType = {
    type: typeof ADD_NEW_POST,
    messageBody: string
};
export const addNewPost = (messageBody: string): AddNewPostActionType => ({type: ADD_NEW_POST, messageBody})

type SetUserActionType = {
    type: typeof SET_USER,
    user: ProfileType
}
export const setUserAction = (user: ProfileType): SetUserActionType => ({type: SET_USER, user})

type SetProfileStatusActionType = {
    type: typeof SET_PROFILE_STATUS,
    message: string
}
export const setProfileStatus = (message: string): SetProfileStatusActionType => ({type: SET_PROFILE_STATUS, message})

type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId})

type SetProfilePhotoSuccessActionType = {
    type: typeof SET_PROFILE_PHOTO_SUCCESS,
    photos: UserPhotosType
}
export const setProfilePhotoSuccess = (photos: UserPhotosType): SetProfilePhotoSuccessActionType => ({type: SET_PROFILE_PHOTO_SUCCESS, photos})

type SetProfileDataSuccessActionType = {
    type: typeof SET_PROFILE_DATA_SUCCESS,
    data: ProfileType
}
export const setProfileDataSuccess = (data: ProfileType): SetProfileDataSuccessActionType => ({type: SET_PROFILE_DATA_SUCCESS, data})





type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


export const getUserProfile = (urlParamId: number): ThunkType => async (dispatch) => {
    const meData = await authAPI.getUserAuthData();
    const authId = meData.data.id;
    const userId = urlParamId ? urlParamId : authId;

    const profile = await usersAPI.getUserProfile(userId);
    dispatch(setUserAction(profile));
}


export const updateProfilePhoto = (photoFile: any): ThunkType => async (dispatch) => {
    const updatedPhotosData = await usersAPI.setProfilePhoto(photoFile);

    if (updatedPhotosData.resultCode === ResultCodesEnum.Success) {
        dispatch(setProfilePhotoSuccess(updatedPhotosData.data));
    }
}


export const getProfileStatus = (userId: number): ThunkType => async (dispatch) => {
    const profileStatus = await usersAPI.getProfileStatus(userId);

    if (profileStatus) {
        dispatch(setProfileStatus(profileStatus));
    }
}


export const updateProfileStatus = (message: string): ThunkType => async (dispatch) => {
    const data = await usersAPI.setProfileStatus(message);
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setProfileStatus(message));
    }
}


export const updateProfileData = (formData: ProfileType): ThunkType => async (dispatch) => {
    const data = await usersAPI.setProfileData(formData);
    
    if(data.resultCode === ResultCodesEnum.Success) {

        dispatch(setProfileDataSuccess(formData));
    } else {
        const errorMessage = data.messages[0];
        // @ts-ignore
        dispatch(stopSubmit('profileData', {_error: errorMessage}));
        return Promise.reject(data.messages[0]);
    }
}



export default profilePageReducer