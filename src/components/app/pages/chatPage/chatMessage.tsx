import React from 'react'
import { Link } from 'react-router-dom';
import { defaultPhoto } from '../../../../assets/images';
import { ChatMessageType } from '../../../../types/types';

import '../../../common/messagesComponents/message.scss'
import UserAvatar from '../../../common/userAvatar/userAvatar';
import UserName from '../../../common/userName/userName';


const ChatMessage: React.FC<MessagePropsType> = React.memo( ({message, isOwnerMessage}) => {
    
    const style = isOwnerMessage ? "message_owner" : "message_friend"

    return (
        <div className={`message ${style}`}>
            <div className="message__info">
                <UserAvatar className="message__author-image" userImage={message.photo} linkTo={`/profile/${message.userId}`} />
                <UserName className="message__author-name" userName={message.userName} linkTo={`/profile/${message.userId}`} />
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