import React from 'react'

import {defaultPhoto} from '../../../../../assets/images'
import * as icons from '../../../../../assets/icons'
import { MessageType } from '../../../../../types/types'


type PropsType = {item: MessageType}

const Post: React.FC<PropsType> = ({item}) => {
    return (
        <div key={item.id} className="posts__item">
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
                {item.label}
            </div>

            <div className="posts__item_footer">
                <div className="post__action">
                    <img className="post__action_icon like__action" src={icons.likeIcon} alt="like_icon" />
                    <div className="post__action_counter like__counter">{item.likesCount}</div>
                </div>
                <div className="post__action">
                    <img className="post__action_icon comments__action" src={icons.commentsIcon} alt="comments_icon" />
                    <div className="post__action_counter coments__counter">22</div>
                </div>
                <div className="post__action">
                    <img className="post__action_icon share__action" src={icons.shareIcon} alt="share_icon" />
                </div>
            </div>
        </div>
    )
}

export default Post;