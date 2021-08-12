import { InferActionsTypes } from "../reduxStore";

const initialState = {
    messages: [
        {id: 0, label: "Hi where are u?", date: "12.6 21:38", myMessage: false},
        {id: 1, label: "Hi! Im in Tallinn right now", date: "12.6 21:38", myMessage: true}
    ] as Array<DialogsMessageType>
        
}
export type DialogsMessageType = { id: number, label: string, date: string, myMessage: boolean }
type InitialStateType = typeof initialState;


const messagesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'sn/messages/SEND_MESSAGE':
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


type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    sendMessageAction: (date: string, messageBody: string) => (
        {type: 'sn/messages/SEND_MESSAGE', date, messageBody} as const
    )
}



export default messagesReducer