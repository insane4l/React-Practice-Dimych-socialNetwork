import React from 'react';
import {changePostValueAction, addPostAction} from '../../../../reducers/profilePageReducer';
import PostAddForm from './';
import StoreContext from '../../../storeContext/storeContext';

const PostAddFormContainer = () => {

    return (
        <StoreContext.Consumer>
            {
                (store) => {                    
                    const state = store.getState();

                    const changeInputValue = (value) => {
                        const action = changePostValueAction(value);
                        store.dispatch(action);
                    }
                    
                    const addNewPost = () => {
                        store.dispatch(addPostAction());
                    }

                    return (
                        <PostAddForm 
                            inputValue={state.profilePage.inputValue}
                            addNewPost={addNewPost}
                            changeInputValue={changeInputValue} />
                    )
                }
            }
        </StoreContext.Consumer>
    )
}

export default PostAddFormContainer;