import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from '../reduxStore'
import {ResultCodesEnum, usersAPI} from '../services/snAPI'
import { UserType } from '../types/types'

const SET_USERS = 'sn/users/SET_USERS'
const TOGGLE_FOLLOWED = 'sn/users/TOGGLE_FOLLOWED'
const SET_PAGE_NUMBER = 'sn/users/SET_PAGE_NUMBER'
const SET_TOTAL_USERS_COUNT = 'sn/users/SET_TOTAL_USERS_COUNT'
const SET_IS_LOADING = 'sn/users/SET_IS_LOADING'
const SET_FOLLOWING_IN_PROGRESS = 'sn/users/SET_FOLLOWING_IN_PROGRESS'


const initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 10,
    currentPage: 1,
    isLoading: false,
    followingInProgress: [] as Array<number>
    
}

type InitialStateType = typeof initialState

const usersPageReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case TOGGLE_FOLLOWED:
            return {
                ...state,
                users: state.users.map( u => {
                    if(u.id === action.userId) {
                        u.followed = !u.followed
                    };
                    return u;
                })
            };
        case SET_PAGE_NUMBER:
            return {...state, currentPage: action.num};
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count};
        case SET_IS_LOADING:
            return {...state, isLoading: action.isLoading}
        case SET_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isInProgress 
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

type ActionsTypes = SetUsersActionType | ToggleFollowedActionType | SetPageNumberActionType |
                    SetTotalUsersCountActionType | SetIsLoadingActionType | SetFollowingInProgressActionType


type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users})

type ToggleFollowedActionType = {
    type: typeof TOGGLE_FOLLOWED,
    userId: number
}
export const toggleFollowed = (userId: number): ToggleFollowedActionType => ({type: TOGGLE_FOLLOWED, userId})

type SetPageNumberActionType = {
    type: typeof SET_PAGE_NUMBER,
    num: number
}
export const setPageNumber = (num: number): SetPageNumberActionType => ({type: SET_PAGE_NUMBER, num})

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    count: number
}
export const setTotalUsersCount = (count: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, count})

type SetIsLoadingActionType = {
    type: typeof SET_IS_LOADING,
    isLoading: boolean
}
export const setIsLoading = (isLoading: boolean): SetIsLoadingActionType => ({type: SET_IS_LOADING, isLoading})

type SetFollowingInProgressActionType = {
    type: typeof SET_FOLLOWING_IN_PROGRESS,
    userId: number,
    isInProgress: boolean
}
export const setFollowingInProgress = (userId: number, isInProgress: boolean): SetFollowingInProgressActionType => ({ type: SET_FOLLOWING_IN_PROGRESS, userId, isInProgress})





type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

const followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: any) => {
    const data = await apiMethod(userId);

    if(data.resultCode === ResultCodesEnum.Success) {
        dispatch(toggleFollowed(userId));
        dispatch(setFollowingInProgress(userId, false));
    }
}

export const followOrUnfollow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(setFollowingInProgress(userId, true)); // disable button while fetching

    const followed = await usersAPI.checkFollowStatus(userId);
    
    if (!followed) { // unfollowed ?
        followUnfollowFlow(dispatch, userId, usersAPI.followToUser); // follow
    } else {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollowFromUser); //unfollow
    }
}



export const setUsersList = (pageSize: number, currentPage: number): ThunkType => async (dispatch) => {
    dispatch(setIsLoading(true)); // activate spinner
    
    const data = await usersAPI.getUsers(pageSize, currentPage);

    dispatch(setIsLoading(false));  // deactivate spinner after response
    dispatch(setUsers(data.items)); // set users from response to state 
    dispatch(setTotalUsersCount(data.totalCount)); // set total users count from response to state

}



export default usersPageReducer