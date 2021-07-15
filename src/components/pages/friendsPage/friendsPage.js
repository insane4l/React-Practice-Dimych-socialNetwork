import React from 'react';
import Pagination from '../../common/pagination/pagination';
import User from './user';


import './frinedsPage.scss';

const FriendsPage = (props) => {
    
    return (  
        <div className="friends__wrapper">
            <Pagination 
                currentPage={props.currentPage}
                totalItemsCount={props.totalUsersCount}
                pageSize={props.pageSize}
                onPageSelected={props.onPageSelected} />

            <ul className="friends__list">
                {
                    props.users.map( u => {
                        const btnLabel = u.followed ? 'Followed' : 'Follow';
                        return <User 
                                    key={u.id} 
                                    user={u}
                                    followingInProgress={props.followingInProgress}
                                    followOrUnfollow={props.followOrUnfollow}
                                    btnLabel={btnLabel} />
                    })
                }             
            </ul>
        </div>
    )
}

export default FriendsPage;