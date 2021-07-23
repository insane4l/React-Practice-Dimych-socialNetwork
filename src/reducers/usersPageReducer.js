import {usersAPI} from '../services/snAPI';


const SET_USERS = 'sn/users/SET_USERS';
const TOGGLE_FOLLOWED = 'sn/users/TOGGLE_FOLLOWED';
const SET_PAGE_NUMBER = 'sn/users/SET_PAGE_NUMBER';
const SET_TOTAL_USERS_COUNT = 'sn/users/SET_TOTAL_USERS_COUNT';
const SET_IS_LOADING = 'sn/users/SET_IS_LOADING';
const SET_FOLLOWING_IN_PROGRESS = 'sn/users/SET_FOLLOWING_IN_PROGRESS';

const initialState = {
    users: [],
    totalUsersCount: 0,
    pageSize: 10,
    currentPage: 1,
    isLoading: false,
    followingInProgress: []
    
}

const usersPageReducer = (state = initialState, action) => {
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

export const setUsers = (users) => ({type: SET_USERS, users});
export const toggleFollowed = (userId) => ({type: TOGGLE_FOLLOWED, userId});
export const setPageNumber = (num) => ({type: SET_PAGE_NUMBER, num});
export const setTotalUsersCount = (count) => ({type: SET_TOTAL_USERS_COUNT, count});
export const setIsLoading = (isLoading) => ({type: SET_IS_LOADING, isLoading});
export const setFollowingInProgress = (userId, isInProgress) => ({ type: SET_FOLLOWING_IN_PROGRESS, userId, isInProgress});




const followUnfollowFlow = async (dispatch, userId, apiMethod) => {
    const response = await apiMethod(userId);
    if(response.status === 200) {
        dispatch(toggleFollowed(userId));
        dispatch(setFollowingInProgress(userId, false));
    }
}

export const followOrUnfollow = (userId) => async (dispatch) => {
    dispatch(setFollowingInProgress(userId, true));

    const followed = await usersAPI.checkFollowStatus(userId);
    if (!followed.data) {
        followUnfollowFlow(dispatch, userId, usersAPI.followToUser);
    } else {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollowFromUser);
    }
}



export const setUsersList = (pageSize, currentPage) => async (dispatch) => {
    dispatch(setIsLoading(true));
    const response = await usersAPI.getUsers(pageSize, currentPage);

    dispatch(setIsLoading(false)); 
    dispatch(setUsers(response.data.items));
    dispatch(setTotalUsersCount(response.data.totalCount));

}



export default usersPageReducer;