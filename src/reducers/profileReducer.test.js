import profilePageReducer, {addNewPost, deletePost} from './profilePageReducer';

const state = {
    messages: [
        {id: 1, label: 'Hi, this is my 1 post', likesCount: 22},
        {id: 2, label: '2 post', likesCount: 10},
        {id: 3, label: 'ok this is 3 post', likesCount: 20}
    ]
};

it('Posts count must be incremented by 1', () => {
    // 1. input data
    const action = addNewPost(111)

    // 2. action
    const newState = profilePageReducer(state, action);

    // expectation
    expect(newState.messages.length).toBe(4);
});



it('New post likes count must be 0', () => {
    // 1. input data
    const action = addNewPost(111)

    // 2. action
    const newState = profilePageReducer(state, action);

    // expectation
    expect(newState.messages[3].likesCount).toBe(0);
})



// programming practice TDD
it('Posts must be decremented by 1', () => {
    // 1. input data
    const action = deletePost(1);

    // 2. action
    const newState = profilePageReducer(state, action);

    // expectation
    expect(newState.messages.length).toBe(2);
})