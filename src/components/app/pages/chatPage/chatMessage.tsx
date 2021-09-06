import React from 'react'
import { Link } from 'react-router-dom';
import { defaultPhoto } from '../../../../assets/images';
import { ChatMessageType } from '../../../../types/types';

import '../../../common/messagesComponents/message.scss'


const ChatMessage: React.FC<MessagePropsType> = React.memo( ({message, isOwnerMessage}) => {
    
    const style = isOwnerMessage ? "message_right" : "message_left"

    return (
        <div className={`message ${style}`}>
            <div className="message__info">
                <Link className="message__author-image" to={`/profile/${message.userId}`}>
                    <img src={message.photo || defaultPhoto} alt="author_image" />
                </Link>
                <Link className="message__author-name" to={`/profile/${message.userId}`}>
                    {message.userName}
                </Link>
                {/* <div className="message__date">22.05.2021</div> todo: there are no dates in the chat message https://social-network.samuraijs.com/api */}
            </div>
            <div className="message__text">{message.message}</div>
        </div>
    )
})

export default ChatMessage



type MessagePropsType = {
    message: ChatMessageType
    isOwnerMessage: boolean
}