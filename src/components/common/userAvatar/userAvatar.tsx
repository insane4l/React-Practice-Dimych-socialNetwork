import React from 'react'
import {Link} from 'react-router-dom'
import { defaultPhoto } from '../../../assets/images'

import './userAvatar.scss'

const UserAvatar: React.FC<UserAvatarPropsType & React.HTMLAttributes<HTMLDivElement>> = ({userImage, linkTo, className}) => {
    return (
        <Link className={className} to={linkTo}>
            <div className="user__component-avatar">
                <img className="user__component-avatar-img" src={userImage || defaultPhoto} alt="user_image" />
            </div>
        </Link>
    )
}

export default UserAvatar



type UserAvatarPropsType = {
    linkTo: string
    className: string
    userImage: string | null | undefined
}