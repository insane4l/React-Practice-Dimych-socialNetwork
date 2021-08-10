import React from 'react'
import { MessageType } from '../../../../../types/types'
import Post from './post'

import './postsTimeline.scss'

type PropsType = {
    messages: Array<MessageType>
}

const PostsTimline: React.FC<PropsType> = (props) => {
    return (
        <div className="posts__timeline">
            {
                [...props.messages].reverse().map(el => {
                    return <Post key={el.id} item={el} />
                })
            }
        </div>
    )
}

export default PostsTimline;