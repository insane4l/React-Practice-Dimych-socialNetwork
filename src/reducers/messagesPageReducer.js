const UPDATE_NEW_MESSAGE_VALUE = 'UPDATE_NEW_MESSAGE_VALUE';
const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState = {
    dialogsList: [
        {
            id:0,
            interlocuter: {id: "", image: "", name: ""},
            messages: [
                {id: 0, label: "Hi where are u?", date: "12.6 21:38", myMessage: false},
                {id: 1, label: "Hi! Im in Tallinn right now", date: "12.6 21:38", myMessage: true}
            ]
        },
        {
            id:1,
            interlocuter: {id: "", image: "", name: ""},
            messages: [
                {id: 0, label: "YOYOYO", date: "11.6 18:30", myMessage: false},
                {id: 1, label: "Hi man", date: "13.6 15:20", myMessage: true}
            ]
        }
    ],
    newMessageBody: "",
};

const messagesPageReducer = (state = initialState, action) => {
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