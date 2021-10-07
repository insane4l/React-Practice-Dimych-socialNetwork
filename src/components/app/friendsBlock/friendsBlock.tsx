import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { requestRandomFriends } from '../../../reducers/usersReducer'
import { getRandomIntegerNum } from '../../../utils/getValueFuncs'
import RequestError from '../../common/errors/requestError'
import Spinner from '../../common/spinner'
import UserAvatar from '../../common/userAvatar/userAvatar'
import UserName from '../../common/userName/userName'
import * as selectors from '../../../selectors/users'

import './friendsBlock.scss'

const FriendsBlock: React.FC<FriendsBlockPropsType> = React.memo( ({friendsPerPage, intervalSeconds}) => {

    const randomFriends = useSelector(selectors.getRandomFriends)
    const randomFriendsRequestError = useSelector(selectors.getRandomFriendsRequestError)
    const totalFriendsCount = useSelector(selectors.getTotalFriendsCount)
    const dispatch = useDispatch()

    const firstPage = 1
    const lastPage = Math.ceil(totalFriendsCount / friendsPerPage)
    const timerInterval = intervalSeconds * 1000

    useEffect( () => {
        dispatch( requestRandomFriends(friendsPerPage, firstPage) )
        //eslint-disable-next-line
    }, [])

    useEffect( () => {
        let timerId: NodeJS.Timeout
        if (totalFriendsCount > friendsPerPage) {
            const randomPageNumber = getRandomIntegerNum(firstPage, lastPage)
            timerId = setTimeout(() => {
                console.log('tik tik');
                dispatch( requestRandomFriends(friendsPerPage, randomPageNumber) )
            }, timerInterval)
        } 
        return () => {
            clearTimeout(timerId)
        }
        //eslint-disable-next-line
    }, [randomFriends, totalFriendsCount])

    

    const randomFriendsList = randomFriends?.map( (f) => (
        <Friend 
            key={f.id}
            friendImage={f.photos.small} 
            friendName={f.name} 
            friendId={f.id} />)
    )

    const friendsBlockContent = randomFriends?.length === 0
        ? <Link to="/users">Find friends on the <b>Users Page</b></Link>
        : <div className="friends__block">{randomFriendsList}</div>

    return (
        <>
            {randomFriends && !randomFriendsRequestError && friendsBlockContent}
            {!randomFriends && !randomFriendsRequestError && <Spinner/> }
            {randomFriendsRequestError && <RequestError errorMessage={randomFriendsRequestError} />}
        </>
    )
})

const Friend: React.FC<FriendPropsType> = ({friendImage, friendName, friendId}) => {
    return (
        <div className="friends__block-item">
            <UserAvatar className="friend__image" userImage={friendImage} linkTo={`/profile/${friendId}`} />
            <UserName className="friend__name" userName={friendName} linkTo={`/profile/${friendId}`} />
        </div>
    )
}

export default FriendsBlock



type FriendsBlockPropsType = {
    friendsPerPage: number
    intervalSeconds: number
}
type FriendPropsType = {
    friendImage: string | null
    friendName: string
    friendId: number
}