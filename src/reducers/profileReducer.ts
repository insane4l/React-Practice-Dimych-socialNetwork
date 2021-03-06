import { FormAction, stopSubmit } from 'redux-form'
import { BaseThunkType, InferActionsTypes } from '../reduxStore'
import {ResultCodesEnum} from '../services/API'
import { usersAPI } from '../services/usersAPI'
import {UserPhotosType, ProfileType, PostType} from '../types/types'


const initialState = {
    messages: [
        {id: 1, postDate: '09.10.2021 12:16', label: 'Hi, this is my 1 post', likesCount: 22, comments: 0},
        {id: 2, postDate: '09.10.2021 12:20', label: '2 post', likesCount: 12, comments: 0},
        {id: 3, postDate: '09.10.2021 12:22', label: 'ok this is 3 post', likesCount: 8, comments: 0}
    ] as Array<PostType>,
    selectedProfile: null as null | ProfileType,
    profileStatus: "",
    selectedProfileFollowedInfo: {
        userId: null as null | number,
        followedStatus: null as null | boolean
    },
    isLoading: false,
    requestErrors: {
        updateProfileStatusError: null as null | string
    }
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
                    postDate: action.payload.date,
                    label: action.payload.messageBody,
                    likesCount: 0,
                    comments: 0
                    }]
            };
            return newState;
        case 'sn/profile/DELETE_POST':
            return {...state,  messages: state.messages.filter(item => item.id !== action.postId)}
        case 'sn/profile/SET_PROFILE':
            return {...state, selectedProfile: action.profile};
        case 'sn/profile/SET_PROFILE_STATUS':
            return {...state, profileStatus: action.message};
        case 'sn/profile/SET_PROFILE_PHOTO_SUCCESS':
            return {...state, selectedProfile: {...state.selectedProfile, photos: action.photos} as ProfileType }; // (temporarily "as UserType" because of TS error)
        case 'sn/profile/SET_PROFILE_DATA_SUCCESS':
            return {...state, selectedProfile: {...state.selectedProfile, ...action.data}}
        case 'sn/profile/PROFILE_FOLLOWED_INFO_RECEIVED':
            return {...state, selectedProfileFollowedInfo: action.payload}
        case 'sn/profile/TOGGLE_PROFILE_FOLLOWED_INFO':
            return {...state, selectedProfileFollowedInfo: {...state.selectedProfileFollowedInfo, followedStatus: !state.selectedProfileFollowedInfo.followedStatus}}
        case 'sn/profile/SET_IS_LOADING':
            return {...state, isLoading: action.isLoading}
        case 'sn/profile/SET_UPDATE_PROFILE_STATUS_ERROR':
            return {...state, requestErrors: {...state.requestErrors, updateProfileStatusError: action.payload.error}}
        default:
            return state;
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    addNewPost: (date: string, messageBody: string) => (
        {type: 'sn/profile/ADD_NEW_POST', payload: {date, messageBody} } as const
    ),
    profileReceived: (profile: ProfileType) => (
        {type: 'sn/profile/SET_PROFILE', profile} as const
    ),
    setProfileStatus: (message: string) => (
        {type: 'sn/profile/SET_PROFILE_STATUS', message} as const
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
    profileFollowedInfoReceived: (userId: number, followedStatus: boolean) => (
            {type: 'sn/profile/PROFILE_FOLLOWED_INFO_RECEIVED', payload: {userId, followedStatus} } as const
    ),
    toggleProfileFollowedInfo: () => (
        {type: 'sn/profile/TOGGLE_PROFILE_FOLLOWED_INFO'} as const
    ),
    setIsLoading: (isLoading: boolean) => (
        {type: 'sn/profile/SET_IS_LOADING', isLoading} as const
    ),
    setUpdateProfileStatusError: (error: null | string) => (
        {type: 'sn/profile/SET_UPDATE_PROFILE_STATUS_ERROR', payload: {error}} as const
    )
}




export const getUserProfile = (userId: number): BaseThunkType<ActionsTypes> => async (dispatch) => {
    dispatch( actions.setIsLoading(true) )
    const profile = await usersAPI.getUserProfile(userId)
    dispatch( actions.profileReceived(profile) )
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


export const requestProfileFollowedInfo = (userId: number): BaseThunkType<ActionsTypes> => async (dispatch) => {
    const isFollowed = await usersAPI.checkFollowStatus(userId)
    dispatch( actions.profileFollowedInfoReceived(userId, isFollowed) )
}


export const updateProfileStatus = (message: string): BaseThunkType<ActionsTypes> => async (dispatch) => {
    const data = await usersAPI.setProfileStatus(message);
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch( actions.setUpdateProfileStatusError(null) )
        dispatch(actions.setProfileStatus(message));
    } else {
        dispatch( actions.setUpdateProfileStatusError('An error has occurred. Please try to enter the status again.') )
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