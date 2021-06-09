export const store = {
    state: {
        profilePage: {
            messages: [
                {id: 1, label: 'Hi, this is my 1 post'},
                {id: 2, label: '2 post'},
                {id: 3, label: 'ok this is 3 post'}
            ],
            
            inputValue: "",
        },

        messagesPage: {}
    },

    updateInputValue(value) {
        this.state.profilePage.inputValue = value;
        rerenderEntireTree();
    },
    
    addPost() {
        let length = this.state.profilePage.messages.length;
        const id = ++length;
        this.state.profilePage.messages.push({
          id,
          label: this.state.profilePage.inputValue
        });
        this.state.profilePage.inputValue = "";
        rerenderEntireTree();
    }

    
}

window.store = store;

let rerenderEntireTree = () => {
    console.log("state changed, rerender entire tree");
}

export const subscribe = (observer) => {
    rerenderEntireTree = observer;
}