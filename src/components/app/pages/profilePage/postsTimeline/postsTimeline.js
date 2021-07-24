import React from 'react';

import {defaultPhoto} from '../../../../../assets/images';
import {likeIcon, commentsIcon, shareIcon} from '../../../../../assets/icons';

import './postsTimeline.scss';

const PostsTimline = (props) => {
    return (
        <div className="posts__timeline">
            {
                props.messages.map(el => {
                    return (
                        <div key={el.id} className="posts__item">
                            <div className="posts__item_header">
                                {/* must be a link authorId*/}
                                <div className="post__author-image"> <img src={defaultPhoto} alt="author_image" /> </div>
                                <div className="post__info-col">
                                    {/* must be a link /authorId*/}
                                    <div className="post__author-name">Roman Karpeyev</div>
                                    {/* must be a link /postLink*/}
                                    <div className="post__date">6 June 2021 at 18:00</div>
                                </div>
                            </div>

                            <div className="posts__item_content">
                                {el.label}
                            </div>

                            <div className="posts__item_footer">
                                <div className="post__action">
                                    <img className="post__action_icon like__action" src={likeIcon} alt="like_icon" />
                                    <div className="post__action_counter like__counter">13</div>
                                </div>
                                <div className="post__action">
                                    <img className="post__action_icon comments__action" src={commentsIcon} alt="comments_icon" />
                                    <div className="post__action_counter coments__counter">22</div>
                                </div>
                                <div className="post__action">
                                    <img className="post__action_icon share__action" src={shareIcon} alt="share_icon" />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default PostsTimline;