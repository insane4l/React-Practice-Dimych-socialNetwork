import React from 'react'
import { PostType } from '../../../../../types/types'
import { useSelector } from 'react-redux'
import Moment from 'react-moment'
import UserAvatar from '../../../../common/userAvatar/userAvatar'
import UserName from '../../../../common/userName/userName'
import * as profileSelectors from '../../../../../selectors/profile'

import * as icons from '../../../../../assets/icons'


const Post: React.FC<PropsType> = React.memo( ({item}) => {

    const profile = useSelector(profileSelectors.getSelectedProfile)

    return (
        <div key={item.id} className="posts__item">
            <div className="posts__item_header">
                <UserAvatar className="post__author-image" userImage={profile?.photos.small} linkTo={`/profile/${profile?.userId}`} />
                <div className="post__info-col">
                    <UserName className="post__author-name" userName={profile?.fullName} linkTo={`/profile/${profile?.userId}`} />
                    {/* must be a link /postLink  (when server can save posts)*/}
                    <div className="post__date"><Moment format="DD MMM YYYY hh:mm" date={item.postDate} /> </div>
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
                    <div className="post__action_counter coments__counter">{item.comments}</div>
                </div>
                <div className="post__action">
                    <img className="post__action_icon share__action" src={icons.shareIcon} alt="share_icon" />
                </div>
            </div>
        </div>
    )
})

export default Post



type PropsType = {item: PostType}