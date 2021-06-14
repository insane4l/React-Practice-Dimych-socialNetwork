const UPDATE_NEW_MESSAGE_VALUE = 'UPDATE_NEW_MESSAGE_VALUE';
const SEND_MESSAGE = 'SEND_MESSAGE';

const messagesPageReducer = (state, action) => {
    switch(action.type) {
        case UPDATE_NEW_MESSAGE_VALUE:
            state.newMessageBody = action.value;
            return state;
        case SEND_MESSAGE:
            let indx = state.dialogsList[0].messages.length;
            const key = ++indx;
            state.dialogsList[0].messages.push({
                id: key,
                label: state.newMessageBody,
                date: action.date,
                myMessage: true
            });
            state.newMessageBody = "";
            return state;
        default:
            return state;
    }
}


export const changeMessageValueAction = (value) => ({
    type: UPDATE_NEW_MESSAGE_VALUE, value
});
export const sendMessageAction = (date) => ({type: SEND_MESSAGE, date});


export default messagesPageReducer;