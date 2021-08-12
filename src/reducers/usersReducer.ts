import { Dispatch } from 'redux'
import { BaseThunkType, InferActionsTypes } from '../reduxStore'
import {ResponseType, ResultCodesEnum} from '../services/API'
import { usersAPI } from '../services/usersAPI'
import { UserType } from '../types/types'


const initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 10,
    currentPage: 1,
    isLoading: false,
    followingInProgress: [] as Array<number>
    
}
export type InitialStateType = typeof initialState


const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'sn/users/SET_USERS':
            return {
                ...state,
                users: action.users
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
        case 'sn/users/SET_IS_LOADING':
            return {...state, isLoading: action.isLoading}
        case 'sn/users/SET_FOLLOWING_IN_PROGRESS':
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


type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    setUsers: (users: Array<UserType>) => (
        {type: 'sn/users/SET_USERS', users} as const
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
    setIsLoading: (isLoading: boolean) => (
        {type: 'sn/users/SET_IS_LOADING', isLoading} as const
    ),
    setFollowingInProgress: (userId: number, 
        isInProgress: boolean) => (
            {type: 'sn/users/SET_FOLLOWING_IN_PROGRESS', userId, isInProgress} as const
    )
}







const followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, 
                userId: number, apiMethod: (userId: number) => Promise<ResponseType<{}, ResultCodesEnum>>) => {
    const data = await apiMethod(userId);

    if(data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.toggleFollowed(userId));
        dispatch(actions.setFollowingInProgress(userId, false));
    }
}

export const followOrUnfollow = (userId: number): BaseThunkType<ActionsTypes> => async (dispatch) => {
    dispatch(actions.setFollowingInProgress(userId, true)); // disable button while fetching

    const followed = await usersAPI.checkFollowStatus(userId);
    
    if (!followed) { // unfollowed ?
        await followUnfollowFlow(dispatch, userId, usersAPI.followToUser); // follow
    } else {
        await followUnfollowFlow(dispatch, userId, usersAPI.unfollowFromUser); //unfollow
    }
}


export const setUsersList = (pageSize: number, currentPage: number): BaseThunkType<ActionsTypes> => async (dispatch) => {
    
    dispatch(actions.setIsLoading(true)); // activate spinner
    
    const data = await usersAPI.getUsers(pageSize, currentPage);

    dispatch(actions.setIsLoading(false));  // deactivate spinner after response
    dispatch(actions.setUsers(data.items)); // set users from response to state 
    dispatch(actions.setTotalUsersCount(data.totalCount)); // set total users count from response to state

}



export default usersReducer