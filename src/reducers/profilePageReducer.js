const UPDATE_NEW_POST_VALUE = 'UPDATE_NEW_POST_VALUE';
const ADD_POST = 'ADD_POST';

const profilePageReducer = (state, action) => {
    switch(action.type) {
        case ADD_POST:
            let length = state.messages.length;
            const id = ++length;
            state.messages.push({
            id,
            label: state.inputValue
            });
            state.inputValue = "";
            return state;
        case UPDATE_NEW_POST_VALUE:
            state.inputValue = action.value;
            return state;
        default:
            return state;
    }
}



export const changePostValueAction = (value) => ({
    type: UPDATE_NEW_POST_VALUE, value
});
export const addPostAction = () => ({type: ADD_POST});

export default profilePageReducer;