import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { requestMessageStatus } from '../../../../../reducers/dialogsReducer'
import { AppStateType } from '../../../../../reduxStore'
import { DialogMessageType } from '../../../../../services/dialogsAPI'

import '../../../../common/messagesComponents/message.scss'


const DialogMessage: React.FC<MessagePropsType> = React.memo( ({message, isOwnerMessage}) => {
    
    const [statusDisplay, setStatusDisplay] = useState(false)
    const viewedStatus = useSelector( (state: AppStateType) => state.dialogsPage.selectedMessageIsViewed)
    const dispatch = useDispatch()
    
    let style = isOwnerMessage ? "message_right" : "message_left"
    if (message.viewed) {style = `${style} message_viewed`}
   
    const viewMessageStatus = (messageId: string) => {
        if (statusDisplay === false) {
            dispatch( requestMessageStatus(messageId) )
            setStatusDisplay(true)
            const timerId = setTimeout(() => { setStatusDisplay(false) }, 5000) // todo: how to clear timeout when 2nd click (and else option {....})
        } else {
            setStatusDisplay(false)
        }
    }

    return (
        <>
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
                <div className="message__text" id="dialog__message-text" onClick={() => viewMessageStatus(message.id)}>{message.body}</div>
            </div>
            {
                statusDisplay && viewedStatus != null && isOwnerMessage
                && <div className="message__status">{viewedStatus === true 
                        ? "The message was viewed by the interlocutor" 
                        : "The message has not been viewed by the interlocutor"}
                    </div>
            }
        </>
    )
})

export default DialogMessage



type MessagePropsType = {
    message: DialogMessageType
    isOwnerMessage: boolean
}