import React from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../../../reduxStore'
import { PostType } from '../../../../../types/types'
import Post from './post'
import PostAddForm from './postAddForm'

import './postsTimeline.scss'


const PostsTimline: React.FC<PropsType> = ({isOwner}) => {
    const messages = useSelector<AppStateType, PostType[]>( (state) => state.profilePage.messages )
    return (
        <>
            {isOwner && <PostAddForm />}
            <div className="posts__timeline">
                {
                    [...messages].reverse().map(el => {
                        return <Post key={el.id} item={el} />
                    })
                }
            </div>
        </>
    )
}

export default PostsTimline



type PropsType = {
    isOwner: boolean
}