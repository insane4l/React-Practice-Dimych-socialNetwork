import React from 'react'
import { Link } from 'react-router-dom';
import { MessageType } from '../../../types/types';

import './message.scss'


const Message: React.FC<MessagePropsType> = React.memo( ({message, style}) => {
    
    return (
        <div className={`message ${style}`}>
            <div className="message__info">
                <Link className="message__author-image" to={`/profile/${message.userId}`}>
                    <img src={message.photo} alt="author_image" />
                </Link>
                <Link className="message__author-name" to={`/profile/${message.userId}`}>
                    {message.userName}
                </Link>
                {/* <div className="message__date">22.05.2021</div> todo: there are no dates in the https://social-network.samuraijs.com/api */}
            </div>
            <div className="message__text">{message.message}</div>
        </div>
    )
})

export default Message



type MessagePropsType = {
    message: MessageType
    style: string
}