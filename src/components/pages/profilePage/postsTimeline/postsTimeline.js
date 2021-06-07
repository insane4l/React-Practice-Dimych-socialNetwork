import React from 'react';

import profilePhoto from '../profilePhoto.jpg';
import likeIcon from './like.svg';
import commentsIcon from './comments.svg';
import shareIcon from './share.svg';

import './postsTimeline.scss';

const PostsTimline = () => {
    return (
        <div className="posts__timeline">

            <div className="posts__item">
                <div className="posts__item_header">
                    {/* must be a link authorId*/}
                    <div className="post__author-image"> <img src={profilePhoto} alt="author_image" /> </div>
                    <div className="post__info-col">
                        {/* must be a link /authorId*/}
                        <div className="post__author-name">Roman Karpeyev</div>
                        {/* must be a link /postLink*/}
                        <div className="post__date">6 June 2021 at 18:00</div>
                    </div>
                </div>

                <div className="posts__item_content">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae temporibus exercitationem a dolor iusto animi optio, molestias magnam, voluptatibus suscipit ullam earum necessitatibus vel alias eligendi quos atque ipsam perspiciatis explicabo incidunt nihil quibusdam. Velit fugit quia eligendi ab tempore distinctio in quo praesentium hic, laborum quos aut accusantium libero.
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
        </div>
    )
}

export default PostsTimline;