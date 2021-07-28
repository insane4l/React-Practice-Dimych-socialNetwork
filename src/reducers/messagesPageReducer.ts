const SEND_MESSAGE = 'sn/messages/SEND_MESSAGE';

type MessageType = {
    id: number,
    label: string,
    date: string,
    myMessage: boolean
}

const initialState = {
    messages: [
        {id: 0, label: "Hi where are u?", date: "12.6 21:38", myMessage: false},
        {id: 1, label: "Hi! Im in Tallinn right now", date: "12.6 21:38", myMessage: true}
    ] as Array<MessageType>
        
};

type InitialStateType = typeof initialState;

const messagesPageReducer = (state = initialState, action: any): InitialStateType => {
    switch(action.type) {
        case SEND_MESSAGE:
            let indx = state.messages.length;
            const key = ++indx;
            return {
                ...state,
                messages: [...state.messages, {
                    id: key,
                    label: action.messageBody,
                    date: action.date,
                    myMessage: true
                }]
            };
        default:
            return state;
    }
}

type SendMessageActionType = {
    type: typeof SEND_MESSAGE,
    date: string,
    messageBody: string
}
export const sendMessageAction = (date: string, messageBody: string): SendMessageActionType => ({type: SEND_MESSAGE, date, messageBody});


export default messagesPageReducer;