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
        debugger;
        switch(action.type) {
            case 'ADD_POST':
                let length = this._state.profilePage.messages.length;
                const id = ++length;
                this._state.profilePage.messages.push({
                id,
                label: this._state.profilePage.inputValue
                });
                this._state.profilePage.inputValue = "";
                this._callSubscriber();
                break;
            case 'UPDATE_INPUT_VALUE':
                this._state.profilePage.inputValue = action.value;
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

window.store = store;

export default store;