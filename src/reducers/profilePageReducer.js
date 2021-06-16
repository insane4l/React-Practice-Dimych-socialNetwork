const UPDATE_NEW_POST_VALUE = 'UPDATE_NEW_POST_VALUE';
const ADD_POST = 'ADD_POST';

const initialState = {
    messages: [
        {id: 1, label: 'Hi, this is my 1 post'},
        {id: 2, label: '2 post'},
        {id: 3, label: 'ok this is 3 post'}
    ],
    inputValue: ""
};

const profilePageReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
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
        default:
            return state;
    }
}



export const changePostValueAction = (value) => ({
    type: UPDATE_NEW_POST_VALUE, value
});
export const addPostAction = () => ({type: ADD_POST});

export default profilePageReducer;