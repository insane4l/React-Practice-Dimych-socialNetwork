import React from 'react'
import {NavLink} from 'react-router-dom'
import { UserType } from '../../../../types/types'
import FollowBtn from '../../../common/buttons/followBtn/followBtn'

import { defaultPhoto } from '../../../../assets/images'
import MessagesBtn from '../../../common/buttons/messagesBtn/messagesBtn'


const User: React.FC<PropsType> = ({user}) => {

    const {id, photos, name, followed, status} = user

    return (
        <li className="users__list-item">
            <NavLink to={`/profile/${id}`}>
                <div className="user__image">
                    <img src={photos.small || defaultPhoto} alt="user_image" />
                </div>
            </NavLink>
            <div className="user__details-wrapper">
                <div className="user__info">
                    <NavLink to={`/profile/${id}`} ><div className="user__name">{name}</div></NavLink>
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