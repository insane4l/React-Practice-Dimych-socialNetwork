import React from 'react';
import {NavLink} from 'react-router-dom';

import defaultPhoto from '../../../../assets/images/defaultPhoto.png';

const User = ({user, followingInProgress, followOrUnfollow, btnLabel}) => {
    return (
        <li className="users__list-item">
            <NavLink to={"/profile/" + user.id}>
                <div className="user__image">
                    <img src={user.photos.small || defaultPhoto} alt="user_image" />
                </div>
            </NavLink>
            <div className="user__info">
                <NavLink to={"/profile/" + user.id} ><div className="user__name">{user.name}</div></NavLink>
                <div className="user__status">{user.status}</div>
                <a className="user__messages-link" href="/messages">Write message</a>
                <button className="follow-btn"
                    disabled={followingInProgress.some(id => id === user.id)}
                    onClick={() => followOrUnfollow(user.id)} >
                    {btnLabel}</button>
            </div>
        </li>
    )
}

export default User;