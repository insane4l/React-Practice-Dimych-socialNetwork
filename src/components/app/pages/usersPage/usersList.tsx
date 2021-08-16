import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import User from './user';
import * as selectors from '../../../../selectors'
import { followOrUnfollow } from '../../../../reducers/usersReducer';

const UsersList: React.FC = () => {

    const users = useSelector(selectors.getUsers)
    const followingInProgress = useSelector(selectors.getFollowingInProgress)

    const dispatch = useDispatch()

    const followUnfollow = (userId: number) => {
        dispatch( followOrUnfollow(userId) )
    }

    return (
        <ul className="users__list">
            {   users.map( u => {
                    const btnLabel = u.followed ? 'Followed' : 'Follow';
                    return <User 
                                key={u.id} 
                                user={u}
                                followingInProgress={followingInProgress}
                                followOrUnfollow={followUnfollow}
                                btnLabel={btnLabel} />
                })
            }             
        </ul>
    )
}

export default UsersList