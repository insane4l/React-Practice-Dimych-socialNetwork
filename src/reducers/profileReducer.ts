import { FormAction, stopSubmit } from 'redux-form'
import { BaseThunkType, InferActionsTypes } from '../reduxStore'
import {ResultCodesEnum} from '../services/API'
import { authAPI } from '../services/authAPI'
import { usersAPI } from '../services/usersAPI'
import {UserPhotosType, ProfileType, MessageType} from '../types/types'


const initialState = {
    messages: [
        {id: 1, label: 'Hi, this is my 1 post', likesCount: 22},
        {id: 2, label: '2 post', likesCount: 12},
        {id: 3, label: 'ok this is 3 post', likesCount: 8}
    ] as Array<MessageType>,
    selectedUser: null as null | ProfileType,
    profileStatus: "",
    isLoading: false,
    isFollowed: null as null | boolean
}
type InitialStateType = typeof initialState


const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'sn/profile/ADD_NEW_POST':
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
        case 'sn/profile/DELETE_POST':
            return {...state,  messages: state.messages.filter(item => item.id !== action.postId)}
        case 'sn/profile/SET_USER':
            return {...state, selectedUser: action.user};
        case 'sn/profile/SET_PROFILE_STATUS':
            return {...state, profileStatus: action.message};
        case 'sn/profile/FOLLOWED_STATUS_RECEIVED':
            return {...state, isFollowed: action.status};
        case 'sn/profile/SET_PROFILE_PHOTO_SUCCESS':
            return {...state, selectedUser: {...state.selectedUser, photos: action.photos} as ProfileType }; // (temporarily "as UserType" because of TS error)
        case 'sn/profile/SET_PROFILE_DATA_SUCCESS':
            return {...state, selectedUser: {...state.selectedUser, ...action.data}}
        case 'sn/profile/SET_IS_LOADING':
            return {...state, isLoading: action.isLoading}
        default:
            return state;
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    addNewPost: (messageBody: string) => (
        {type: 'sn/profile/ADD_NEW_POST', messageBody} as const
    ),
    setUserAction: (user: ProfileType) => (
        {type: 'sn/profile/SET_USER', user} as const
    ),
    setProfileStatus: (message: string) => (
        {type: 'sn/profile/SET_PROFILE_STATUS', message} as const
    ),
    followedStatusReceived: (status: boolean) => (
        {type: 'sn/profile/FOLLOWED_STATUS_RECEIVED', status} as const
    ),
    deletePost: (postId: number) => (
        {type: 'sn/profile/DELETE_POST', postId} as const
    ),
    setProfilePhotoSuccess: (photos: UserPhotosType) => (
        {type: 'sn/profile/SET_PROFILE_PHOTO_SUCCESS', photos} as const
    ),
    setProfileDataSuccess: (data: ProfileType) => (
        {type: 'sn/profile/SET_PROFILE_DATA_SUCCESS', data} as const
    ),
    setIsLoading: (isLoading: boolean) => (
        {type: 'sn/profile/SET_IS_LOADING', isLoading} as const
    )
}




export const getUserProfile = (urlParamId: number): BaseThunkType<ActionsTypes> => async (dispatch) => {
    const meData = await authAPI.getUserAuthData()
    const authId = meData.data.id
    const userId = urlParamId ? urlParamId : authId
    dispatch( actions.setIsLoading(true) )
    const profile = await usersAPI.getUserProfile(userId)
    dispatch( actions.setUserAction(profile) )
    dispatch( actions.setIsLoading(false) )
}


export const updateProfilePhoto = (photoFile: File): BaseThunkType<ActionsTypes> => async (dispatch) => {
    const updatedPhotosData = await usersAPI.setProfilePhoto(photoFile);

    if (updatedPhotosData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setProfilePhotoSuccess(updatedPhotosData.data.photos));
    }
}


export const getProfileStatus = (userId: number): BaseThunkType<ActionsTypes> => async (dispatch) => {
    const profileStatus = await usersAPI.getProfileStatus(userId);
    
    if (profileStatus) {
        dispatch(actions.setProfileStatus(profileStatus));
    } else {
        dispatch(actions.setProfileStatus("..."));
    }
}

export const getFollowedStatus = (userId: number): BaseThunkType<ActionsTypes> => async (dispatch) => {
    const followedStatus = await usersAPI.checkFollowStatus(userId)

    dispatch( actions.followedStatusReceived(followedStatus) )
}

export const updateProfileStatus = (message: string): BaseThunkType<ActionsTypes> => async (dispatch) => {
    const data = await usersAPI.setProfileStatus(message);
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setProfileStatus(message));
    }
}


type WithAnotherActionsThunkType = BaseThunkType<ActionsTypes | FormAction>
export const updateProfileData = (formData: ProfileType): WithAnotherActionsThunkType => async (dispatch) => {
    const data = await usersAPI.setProfileData(formData);
    
    if(data.resultCode === ResultCodesEnum.Success) {

        dispatch(actions.setProfileDataSuccess(formData));
    } else {
        const errorMessage = data.messages[0];

        dispatch(stopSubmit('profileData', {_error: errorMessage})); // action not from ActionsTypes
        return Promise.reject(data.messages[0]);
    }
}



export default profileReducer