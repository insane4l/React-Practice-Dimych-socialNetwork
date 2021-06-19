const SET_USERS = 'SET_USERS';
const TOGGLE_FOLLOWED = 'TOGGLE_FOLLOWED';

const initialState = {
    users: []
}

const friendsPageReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USERS:
            return {
                users: [...state.users, ...action.users]
            }
        case TOGGLE_FOLLOWED:
            
            return {
                users: state.users.map( u => {
                    if(u.id === action.userId) {
                        u.followed = !u.followed
                    };
                    return u;
                })
            }
        default:
            return state;
    }
}

export const setUsersAC = (users) => ({type: SET_USERS, users});
export const toggleFollowedAC = (userId) => ({type: TOGGLE_FOLLOWED, userId});

export default friendsPageReducer;