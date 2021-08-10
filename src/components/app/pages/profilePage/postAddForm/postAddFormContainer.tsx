import React from 'react';
import {actions} from '../../../../../reducers/profilePageReducer';
import PostAddForm from '.';
import {connect} from 'react-redux';
import { AppStateType } from '../../../../../reduxStore';


const mapStateToProps = (state: AppStateType) => ({ });

const mapDispatchToProps = {
    addNewPost: actions.addNewPost
};

const PostAddFormContainer = connect(mapStateToProps, mapDispatchToProps)(PostAddForm);


export default PostAddFormContainer;