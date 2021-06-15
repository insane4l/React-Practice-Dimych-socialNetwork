import React from 'react';
import PostsTimeline from './';

import './postsTimeline.scss';

const PostsTimlineContainer = (props) => {
    const state = props.store.getState();
    return <PostsTimeline messages={state.profilePage.messages}  />
}

export default PostsTimlineContainer;