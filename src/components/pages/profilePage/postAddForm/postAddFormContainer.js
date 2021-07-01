import React from 'react';
import {changePostValue, addNewPost} from '../../../../reducers/profilePageReducer';
import PostAddForm from './';
import {connect} from 'react-redux';


const mapStateToProps = (state) => {
    return {
        inputValue: state.profilePage.inputValue
    }
};

const mapDispatchToProps = {
    changePostValue,
    addNewPost
};

const PostAddFormContainer = connect(mapStateToProps, mapDispatchToProps)(PostAddForm);


export default PostAddFormContainer;