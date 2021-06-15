import React from 'react';
import PostsTimeline from './';
import StoreContext from '../../../storeContext/storeContext';

import './postsTimeline.scss';

const PostsTimlineContainer = (props) => {
    
    return (
        <StoreContext.Consumer>
            {
                (store) => <PostsTimeline messages={store.getState().profilePage.messages}  />
            }
        </StoreContext.Consumer>
    )
}

export default PostsTimlineContainer;