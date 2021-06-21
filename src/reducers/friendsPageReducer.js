const SET_USERS = 'SET_USERS';
const TOGGLE_FOLLOWED = 'TOGGLE_FOLLOWED';
const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';

const initialState = {
    users: [],
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1
    
}

const friendsPageReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
}

export const setUsersAC = (users) => ({type: SET_USERS, users});
export const toggleFollowedAC = (userId) => ({type: TOGGLE_FOLLOWED, userId});
export const setPageNumber = (num) => ({type: SET_PAGE_NUMBER, num});
export const setTotalUsersCount = (count) => ({type: SET_TOTAL_USERS_COUNT, count});

export default friendsPageReducer;