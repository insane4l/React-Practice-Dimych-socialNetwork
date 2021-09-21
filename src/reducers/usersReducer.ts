import { Dispatch } from 'redux'
import { BaseThunkType, InferActionsTypes } from '../reduxStore'
import {ResponseType, ResultCodesEnum} from '../services/API'
import { usersAPI } from '../services/usersAPI'
import { RequestErrorHandlingType, UserType } from '../types/types'
import {actions as profileActions} from './profileReducer'


const initialState = {
    users: [] as Array<UserType>,
    randomFriends: null as null | Array<UserType>,
    totalUsersCount: 0,
    totalFriendsCount: 0,
    pageSize: 10,
    currentPage: 1,
    filters: {
        term: '', 
        friend: null as null | boolean
    },
    followingInProgress: [] as Array<number>,
    isLoading: false,
    requestErrors: {
        changingSubscriptionStatusError: null as null | string,
        usersRequestError: null as null | string,
        randomFriendsRequestError: null as null | string
    }
}
export type InitialStateType = typeof initialState
export type UsersListFiltersType = typeof initialState.filters

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'sn/users/SET_USERS':
            return {
                ...state,
                users: action.users
            };
        case 'sn/users/RANDOM_FRIENDS_RECEIVED':
            return {
                ...state,
                randomFriends: action.payload.randomFriends
            };
        case 'sn/users/TOGGLE_FOLLOWED':
            return {
                ...state,
                users: state.users.map( u => {
                    if(u.id === action.userId) {
                        u.followed = !u.followed
                    };
                    return u;
                })
            };
        case 'sn/users/SET_PAGE_NUMBER':
            return {...state, currentPage: action.num};
        case 'sn/users/SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.count};
        case 'sn/users/SET_TOTAL_FRIENDS_COUNT':
            return {...state, totalFriendsCount: action.count};
        case 'sn/users/SET_FILTERS':
            return {
                ...state,
                filters: {...state.filters, ...action.payload}
            };
        case 'sn/users/SET_IS_LOADING':
            return {...state, isLoading: action.isLoading}
        case 'sn/users/SET_FOLLOWING_IN_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isInProgress 
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        case 'sn/users/SET_REQUEST_ERROR':
            return {
                ...state,
                requestErrors: {...state.requestErrors, ...action.payload.error}
            };
        default:
            return state;
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    setUsers: (users: Array<UserType>) => (
        {type: 'sn/users/SET_USERS', users} as const
    ),
    randomFriendsReceived: (randomFriends: Array<UserType>) => (
        {type: 'sn/users/RANDOM_FRIENDS_RECEIVED', payload: {randomFriends}} as const
    ),
    toggleFollowed: (userId: number) => (
        {type: 'sn/users/TOGGLE_FOLLOWED', userId} as const
    ),
    setPageNumber: (num: number) => (
        {type: 'sn/users/SET_PAGE_NUMBER', num} as const
    ),
    setTotalUsersCount: (count: number) => (
        {type: 'sn/users/SET_TOTAL_USERS_COUNT', count} as const
    ),
    setTotalFriendsCount: (count: number) => (
        {type: 'sn/users/SET_TOTAL_FRIENDS_COUNT', count} as const
    ),
    setFilters: (filters: UsersListFiltersType) => (
        {type: 'sn/users/SET_FILTERS', payload: filters} as const
    ),
    setIsLoading: (isLoading: boolean) => (
        {type: 'sn/users/SET_IS_LOADING', isLoading} as const
    ),
    setFollowingInProgress: (userId: number, 
        isInProgress: boolean) => (
            {type: 'sn/users/SET_FOLLOWING_IN_PROGRESS', userId, isInProgress} as const
    ),
    setRequestError: (error: RequestErrorHandlingType) => (
        {type: 'sn/users/SET_REQUEST_ERROR', payload: {error}} as const
    )
}





const followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes | ProfileReducerActionToggleType>, 
                userId: number, apiMethod: (userId: number) => Promise<ResponseType<{}, ResultCodesEnum>>) => {

    const data = await apiMethod(userId)

    if(data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setRequestError({changingSubscriptionStatusError: null}))
        dispatch(actions.toggleFollowed(userId))
        dispatch(profileActions.toggleProfileFollowedInfo())
        dispatch(actions.setFollowingInProgress(userId, false))
    } else {
        dispatch(actions.setRequestError({changingSubscriptionStatusError: 'Some error occured. Please try to follow again'}))
    }
}

export const followOrUnfollow = (userId: number): BaseThunkType<ActionsTypes> => async (dispatch) => {
    dispatch(actions.setFollowingInProgress(userId, true)); // disable button while fetching

    const isFollowed = await usersAPI.checkFollowStatus(userId)

    if (!isFollowed) { // unfollowed ?
        await followUnfollowFlow(dispatch, userId, usersAPI.followToUser) // follow
    } else {
        await followUnfollowFlow(dispatch, userId, usersAPI.unfollowFromUser) //unfollow
        dispatch( requestRandomFriends(undefined, 1) )
    }
}


export const requestUsers = (pageSize: number, currentPage: number, {term = '', friend = null}: UsersListFiltersType): BaseThunkType<ActionsTypes> => async (dispatch) => {
    
    dispatch(actions.setIsLoading(true)) // activate spinner
    try {
        const data = await usersAPI.getUsers(pageSize, currentPage, term, friend)

        dispatch(actions.setRequestError({usersRequestError: null}))
        dispatch(actions.setFilters({term, friend}))
        dispatch(actions.setPageNumber(currentPage))
        dispatch(actions.setIsLoading(false))  // deactivate spinner after response
    
        dispatch(actions.setUsers(data.items)) // set users from response to state 
        dispatch(actions.setTotalUsersCount(data.totalCount)) // set total users count from response to state
    } catch {
        dispatch(actions.setIsLoading(false))
        dispatch(actions.setRequestError({usersRequestError: 'Something goes wrong. Please try to refresh the page'}))
    }
}

export const requestRandomFriends = (pageSize = 9, pageNumber: number): BaseThunkType<ActionsTypes> => async (dispatch) => {
    try {
        const data = await usersAPI.getUsers(pageSize, pageNumber, '', true)
        dispatch(actions.setRequestError({randomFriendsRequestError: null}))

        if (data.totalCount > 0) {
            dispatch( actions.randomFriendsReceived(data.items) )
            dispatch( actions.setTotalFriendsCount(data.totalCount) )
        } else {
            dispatch( actions.randomFriendsReceived([]) )
            dispatch( actions.setTotalFriendsCount(0) )
        }
    } 
    catch {
        dispatch(actions.setRequestError({randomFriendsRequestError: 'An error has occurred, possibly a bad connection to the server. Auto-updating of the friends list is paused. To fix it please try reloading the page.'}))
    }  
}



export default usersReducer



type ProfileReducerActionToggleType = {
    type: 'sn/profile/TOGGLE_PROFILE_FOLLOWED_INFO'
}