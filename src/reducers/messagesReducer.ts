import { InferActionsTypes } from "../reduxStore";
import { MessageType } from "../types/types";

const initialState = {
    messages: [
        {message: "Hi where are u?", photo: "", userId: 111, userName: "fdsaf"},
        {message: "Hi! Im in Tallinn right now", photo: "", userId: 17964, userName: "fdsfffffaf"}
    ] as Array<MessageType>
}


type InitialStateType = typeof initialState;


const messagesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'sn/messages/SEND_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, {
                    message: action.messageBody,
                    photo: "",
                    userId: 111,
                    userName: "fdsaf"
                }]
            };
        default:
            return state;
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    sendMessageAction: (messageBody: string) => (
        {type: 'sn/messages/SEND_MESSAGE', messageBody} as const
    )
}



export default messagesReducer