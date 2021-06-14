import profilePageReducer from './reducers/profilePageReducer';
import messagesPageReducer from './reducers/messagesPageReducer';


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
        this._state.profilePage = profilePageReducer(this._state.profilePage, action);
        this._state.messagesPage = messagesPageReducer(this._state.messagesPage, action);
        this._callSubscriber();
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    }
}







window.store = store;

export default store;