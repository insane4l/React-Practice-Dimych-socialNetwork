import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followOrUnfollow } from '../../../../reducers/usersReducer'
import * as selectors from '../../../../selectors'

import '../buttons.scss'

const FollowBtn: React.FC<FollowBtnPropsType> = ({isFollowed, userId}) => {

    const followingInProgress = useSelector(selectors.getFollowingInProgress)
    const btnLabel = isFollowed ? 'Unfollow' : isFollowed === false ? 'Follow' : ''
    const btnStyle = isFollowed ? 'user__follow-btn unfollow-btn' : 'user__follow-btn'
    const dispatch = useDispatch()

    const followUnfollow = (userId: number) => {
        dispatch( followOrUnfollow(userId) )
    }

    if (isFollowed === null || !userId) return <div></div> // todo: fix on profile page when user refreshed + remove user from friends block (useEffect)
    
    return (
        <button 
            className={btnStyle}
            disabled={followingInProgress.some(id => id === userId)}
            onClick={() => followUnfollow(userId)} >
        {btnLabel}
        </button>
    )
}

export default FollowBtn



type FollowBtnPropsType = {
    isFollowed: boolean | null
    userId: number | null
}