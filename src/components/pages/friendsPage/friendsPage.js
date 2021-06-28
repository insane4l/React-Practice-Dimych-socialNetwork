import React from 'react';
import {NavLink} from 'react-router-dom';
import usersAPI from '../../../services/usersAPI';

import './frinedsPage.scss';

const FriendsPage = (props) => {
    
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages = [];
    
    for(let i=1; i <= pagesCount; i++){
        pages.push(i);
    };
    const nextPages = props.currentPage + 2;
    const prevPages = props.currentPage - 2;

    return (  
        <div className="friends__wrapper">
            <div className="pagination">
                    {
                        pages
                            .filter(num => (num === 1 || num === props.currentPage || (num >= prevPages && num <= nextPages) || num === pagesCount) )
                            .map(num =>
                                <span 
                                    key={num} 
                                    className={`pagination__item ${num === props.currentPage ? 'pagination__item_active' : ''}`}
                                    onClick={() => props.onPageSelected(num)}>
                                    {num}
                                </span>)
                            
                    }
            </div>
            <ul className="friends__list">
                {   
                    props.users.map( u => {
                        const btnLabel = u.followed ? 'Followed' : 'Follow';
                        return (
                            <li key={u.id} className="friends__list-item">
                                <NavLink to={"/profile/" + u.id}>
                                    <div className="friend__image">
                                        <img src={u.photos.small} alt="friend_image" />
                                    </div>
                                </NavLink>
                                <div className="friend__info">
                                    <NavLink to={"/profile/" + u.id} ><div className="friend__name">{u.name}</div></NavLink>
                                    <div className="friend__status">{u.status}</div>
                                    <a className="friend__messages-link" href="/messages">Write message</a>
                                    <button onClick={() => {
                                        usersAPI.checkFollowStatus(u.id)
                                                .then(followed => {
                                                    if(!followed.data) {
                                                        usersAPI.followToUser(u.id).then(response => {
                                                            if(response.status === 200) {
                                                                props.toggleFollowed(u.id)
                                                            }
                                                        })
                                                    } else {
                                                        usersAPI.unfollowFromUser(u.id).then(response => {
                                                            if(response.status === 200) {
                                                                props.toggleFollowed(u.id)
                                                            }
                                                        })
                                                    }
                                                })
                                        
                                        }
                                    }>{btnLabel}</button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
    
}

export default FriendsPage;