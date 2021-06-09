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
        messagesPage: {}
    },
    getState() {
        return this._state;
    },

    updateInputValue(value) {
        this._state.profilePage.inputValue = value;
        this.callSubscriber();
    },
    
    addPost() {
        let length = this._state.profilePage.messages.length;
        const id = ++length;
        this._state.profilePage.messages.push({
          id,
          label: this._state.profilePage.inputValue
        });
        this._state.profilePage.inputValue = "";
        this.callSubscriber();
    },





    callSubscriber() {
        console.log("state changed");
    },

    subscribe(observer) {
        this.callSubscriber = observer;
    }
}

window.store = store;

export default store;