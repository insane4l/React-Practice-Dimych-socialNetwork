import React from 'react'
import {NavLink} from 'react-router-dom'
import { UserType } from '../../../../types/types'
import FollowBtn from '../../../common/buttons/followBtn/followBtn'

import { defaultPhoto } from '../../../../assets/images'
import MessagesBtn from '../../../common/buttons/messagesBtn/messagesBtn'
import UserAvatar from '../../../common/userAvatar/userAvatar'
import UserName from '../../../common/userName/userName'


const User: React.FC<PropsType> = ({user}) => {

    const {id, photos, name, followed, status} = user

    return (
        <li className="users__list-item">
            <UserAvatar className="user__image" userImage={photos.small} linkTo={`/profile/${id}`} />
            <div className="user__details-wrapper">
                <div className="user__info">
                    <UserName className="user__name" userName={name} linkTo={`/profile/${id}`} />
                    <div className="user__status">{status}</div>
                </div>
                <div className="user__buttons-wrapper">
                    <MessagesBtn linkTo={`/dialogs/${id}`} />
                    <FollowBtn isFollowed={followed} userId={id} />
                </div>
            </div>
        </li>
    )
}

export default User



type PropsType = {
    user: UserType
}