import { InferActionsTypes } from "../reduxStore";
import { MessageType } from "../types/types";

const initialState = {
    messages: [
        {message: "Hi where are u?", photo: "https://tehnot.com/wp-content/uploads/2017/09/pavel.jpg", userId: 111, userName: "Pavel Durov"},
        {message: "Hi! Im in Tallinn right now", photo: "", userId: 17964, userName: "fdsfffffaf"}
    ] as Array<MessageType>
}


type InitialStateType = typeof initialState;


const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'sn/dialogs/SEND_MESSAGE':
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
        {type: 'sn/dialogs/SEND_MESSAGE', messageBody} as const
    )
}



export default dialogsReducer