import React from 'react';
import {NavLink} from 'react-router-dom';

const User = ({user, followingInProgress, followOrUnfollow, btnLabel}) => {
    return (
        <li className="friends__list-item">
            <NavLink to={"/profile/" + user.id}>
                <div className="friend__image">
                    <img src={user.photos.small} alt="friend_image" />
                </div>
            </NavLink>
            <div className="friend__info">
                <NavLink to={"/profile/" + user.id} ><div className="friend__name">{user.name}</div></NavLink>
                <div className="friend__status">{user.status}</div>
                <a className="friend__messages-link" href="/messages">Write message</a>
                <button className="follow-btn"
                    disabled={followingInProgress.some(id => id === user.id)}
                    onClick={() => followOrUnfollow(user.id)} >
                    {btnLabel}</button>
            </div>
        </li>
    )
}

export default User;