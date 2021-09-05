import React from 'react'
import { Link } from 'react-router-dom'
import { DialogMessageType } from '../../../../../services/dialogsAPI'

import '../../../../common/messagesComponents/message.scss'


const ChatMessage: React.FC<MessagePropsType> = React.memo( ({message, style}) => {
    
    return (
        <div className={`message ${style}`}>
            <div className="message__info">
                {/* <Link className="message__author-image" to={`/profile/${message.userId}`}>
                    <img src={message.photo || defaultPhoto} alt="author_image" />
                </Link> todo: there are no photo in the dialog message https://social-network.samuraijs.com/api*/} 
                <Link className="message__author-name" to={`/profile/${message.senderId}`}>
                    {message.senderName} {/* todo: senderName its nickname need userName */} 
                </Link>
                <div className="message__date">{message.addedAt}</div>
            </div>
            <div className="message__text">{message.body}</div>
        </div>
    )
})

export default ChatMessage



type MessagePropsType = {
    message: DialogMessageType
    style: string
}