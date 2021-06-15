import React from 'react';
import {changePostValueAction, addPostAction} from '../../../../reducers/profilePageReducer';
import PostAddForm from './';

const PostAddFormContainer = (props) => {
    
    const state = props.store.getState();
    

    const changeInputValue = (value) => {
        const action = changePostValueAction(value);
        props.store.dispatch(action);
    }

    const addNewPost = () => {
        props.store.dispatch(addPostAction());
    }

    return <PostAddForm inputValue={state.profilePage.inputValue} addNewPost={addNewPost} changeInputValue={changeInputValue} />
}

export default PostAddFormContainer;