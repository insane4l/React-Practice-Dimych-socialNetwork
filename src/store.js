const UPDATE_NEW_POST_VALUE = 'UPDATE_NEW_POST_VALUE';
const ADD_POST = 'ADD_POST';
const UPDATE_NEW_MESSAGE_VALUE = 'UPDATE_NEW_MESSAGE_VALUE';
const SEND_MESSAGE = 'SEND_MESSAGE';



const store = {
    _state: {
        profilePage: {
            messages: [
                {id: 1, label: 'Hi, this is my 1 post'},
                {id: 2, label: '2 post'},
                {id: 3, label: 'ok this is 3 post'}
            ],
            inputValue: ""
        },
        messagesPage: {
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
        }
    },
    _callSubscriber() {
        console.log("state changed");
    },




    getState() {
        return this._state;
    },

    updateInputValue(value) {
        this._state.profilePage.inputValue = value;
        this._callSubscriber();
    },
    
    addPost() {
        let length = this._state.profilePage.messages.length;
        const id = ++length;
        this._state.profilePage.messages.push({
          id,
          label: this._state.profilePage.inputValue
        });
        this._state.profilePage.inputValue = "";
        this._callSubscriber();
    },





    dispatch(action) {
        switch(action.type) {
            case ADD_POST:
                let length = this._state.profilePage.messages.length;
                const id = ++length;
                this._state.profilePage.messages.push({
                id,
                label: this._state.profilePage.inputValue
                });
                this._state.profilePage.inputValue = "";
                this._callSubscriber();
                break;
            case UPDATE_NEW_POST_VALUE:
                this._state.profilePage.inputValue = action.value;
                this._callSubscriber();
                break;
            case UPDATE_NEW_MESSAGE_VALUE:
                this._state.messagesPage.newMessageBody = action.value;
                this._callSubscriber();
                break;
            case SEND_MESSAGE:
                let indx = this._state.messagesPage.dialogsList[0].messages.length;
                const key = ++indx;
                this._state.messagesPage.dialogsList[0].messages.push({
                    id: key,
                    label: this._state.messagesPage.newMessageBody,
                    date: action.date,
                    myMessage: true
                });
                this._state.messagesPage.newMessageBody = "";
                this._callSubscriber();
                break;
            default: 
                console.log(action.type);
        }
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    }
}


export const changePostValueAction = (value) => ({
    type: UPDATE_NEW_POST_VALUE, value
});
export const addPostAction = () => ({type: ADD_POST});

export const changeMessageValueAction = (value) => ({
    type: UPDATE_NEW_MESSAGE_VALUE, value
});
export const sendMessageAction = (date) => ({type: SEND_MESSAGE, date});





window.store = store;

export default store;