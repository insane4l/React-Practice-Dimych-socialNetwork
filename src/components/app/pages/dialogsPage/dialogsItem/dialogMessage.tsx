import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions, requestMessageStatus } from '../../../../../reducers/dialogsReducer'
import { AppStateType } from '../../../../../reduxStore'
import { DialogMessageType } from '../../../../../services/dialogsAPI'

import '../../../../common/messagesComponents/message.scss'


const DialogMessage: React.FC<MessagePropsType> = React.memo( ({message, isOwnerMessage}) => {

    const [statusDisplay, setStatusDisplay] = useState(false)
    const dispatch = useDispatch()
    const style = isOwnerMessage ? "message_owner" : "message_friend"
   

    const viewMessageActualStatus = () => {
        if (message.viewed === true) {
            dispatch( actions.addMessageToViewed(message.id) ) // add to viewed arr, because of arr.some() --- "Has been VIEWED"
            showStatus(4)
        }
        if (message.viewed === false) { // if message initial viewed false, request API actual status
            dispatch( requestMessageStatus(message.id) ) 
            showStatus(4)
        }
    }
    const showStatus = (seconds: number) => {
        const milliseconds = seconds * 1000
        setStatusDisplay(true)
        const timerId = setTimeout(() => { setStatusDisplay(false) }, milliseconds)
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
                <div className="message__text" id="dialog__message-text">{message.body}</div>
                {isOwnerMessage && !statusDisplay && <div className="check-status__btn" onClick={viewMessageActualStatus}>Check status</div>}
                {statusDisplay && <MessageStatus messageId={message.id} />}
            </div>
        </>
    )
})


const MessageStatus: React.FC<{messageId: string}> = ({messageId}) => {
    const viewedMessages = useSelector( (state: AppStateType) => state.dialogsPage.viewedMessages)
    console.log('STATUS rerendered');
    return (
        <div className="message__status">
            { viewedMessages.some(id => id === messageId) 
                ? "Viewed" 
                : "Not viewed" }
        </div>
        
    )
}

export default DialogMessage



type MessagePropsType = {
    message: DialogMessageType
    isOwnerMessage: boolean
}