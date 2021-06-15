import React from 'react';
import PostsTimeline from './';
import {connect} from 'react-redux';

import './postsTimeline.scss';


const mapStateToProps = (state) => {
    return {
        messages: state.profilePage.messages
    }
};

const PostsTimlineContainer = connect(mapStateToProps)(PostsTimeline);


export default PostsTimlineContainer;