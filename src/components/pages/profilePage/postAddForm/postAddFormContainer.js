import React from 'react';
import {changePostValueAction, addPostAction} from '../../../../reducers/profilePageReducer';
import PostAddForm from './';
import {connect} from 'react-redux';


const mapStateToProps = (state) => {
    return {
        inputValue: state.profilePage.inputValue
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeInputValue: (value) => {
            const action = changePostValueAction(value);
            dispatch(action);
        },
        addNewPost: () => {dispatch(addPostAction())}
    }
};

const PostAddFormContainer = connect(mapStateToProps, mapDispatchToProps)(PostAddForm);


export default PostAddFormContainer;