import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { defaultPhoto } from '../../../assets/images'
import { requestRandomFriends } from '../../../reducers/usersReducer'
import { AppStateType } from '../../../reduxStore'
import { getRandomIntegerNum } from '../../../utils/getValueFuncs'
import Spinner from '../../common/spinner'

import './friendsBlock.scss'

const FriendsBlock: React.FC<FriendsBlockPropsType> = React.memo( ({friendsPerPage, intervalSeconds}) => {

    const randomFriends = useSelector( (state: AppStateType) => state.usersPage.randomFriends )
    const totalFriendsCount = useSelector( (state: AppStateType) => state.usersPage.totalFriendsCount )
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

    console.log('rerender');
    return (
        <>
            {!randomFriends ? <Spinner/> : friendsBlockContent}
        </>
    )
})

const Friend: React.FC<FriendPropsType> = ({friendImage, friendName, friendId}) => {
    return (
        <Link to={`/profile/${friendId}`} className="friends__block-item">
            <div className="friend__image">
                <img src={friendImage || defaultPhoto} alt="friend_image" />
            </div>
            <div className="friend__name">{friendName}</div>
        </Link>
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