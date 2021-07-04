import usersAPI from '../services/usersAPI';

const UPDATE_NEW_POST_VALUE = 'UPDATE_NEW_POST_VALUE';
const ADD_NEW_POST = 'ADD_NEW_POST';
const SET_USER = 'SET_USER';
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS';

const initialState = {
    messages: [
        {id: 1, label: 'Hi, this is my 1 post'},
        {id: 2, label: '2 post'},
        {id: 3, label: 'ok this is 3 post'}
    ],
    inputValue: "",
    selectedUser: null,
    profileStatus: ""
};

const profilePageReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_NEW_POST:
            let length = state.messages.length;
            const id = ++length;
            const newState = {
                ...state,
                messages: [...state.messages, {
                    id,
                    label: state.inputValue
                    }]
            };
            newState.inputValue = "";
            // console.log(state.messages === newState.messages); //must be false (not old state object changed "by link" immutable principle)
            return newState;
        case UPDATE_NEW_POST_VALUE:
            return {
                ...state,
                inputValue: action.value
            };
        case SET_USER:
            return {...state, selectedUser: action.user};
        case SET_PROFILE_STATUS:
            return {...state, profileStatus: action.message};
        default:
            return state;
    }
}



export const changePostValue = (value) => ({type: UPDATE_NEW_POST_VALUE, value});
export const addNewPost = () => ({type: ADD_NEW_POST});
export const setUserAction = (user) => ({type: SET_USER, user});
export const setProfileStatus = (message) => ({type: SET_PROFILE_STATUS, message});



export const getUserProfile = (urlParamId) => {
    return (dispatch) => {
        usersAPI.getUserAuthData().then(response => {
            const authId = response.data.data.id;
            const userId = urlParamId ? urlParamId : authId;

            usersAPI.getUserProfile(userId).then(response => {
                dispatch(setUserAction(response.data));
            });
})
    }
}

export const getProfileStatus = (userId) => {
    return (dispatch) => {
        usersAPI.getProfileStatus(userId).then(response => {
            dispatch(setProfileStatus(response.data));
        })
    }
}

export const updateProfileStatus = (message) => {
    return (dispatch) => {
        usersAPI.setProfileStatus(message).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setProfileStatus(message));
            }
        })
    }
}


export default profilePageReducer;