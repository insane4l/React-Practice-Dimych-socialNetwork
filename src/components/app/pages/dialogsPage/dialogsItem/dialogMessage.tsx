import React, { useState } from 'react'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { actions, requestMessageStatus } from '../../../../../reducers/dialogsReducer'
import { DialogMessageType } from '../../../../../services/dialogsAPI'
import RequestError from '../../../../common/errors/requestError'
import UserAvatar from '../../../../common/userAvatar/userAvatar'
import UserName from '../../../../common/userName/userName'
import * as dialogsSelectors from '../../../../../selectors/dialogs'

import '../../../../common/messagesComponents/message.scss'


const DialogMessage: React.FC<MessagePropsType> = React.memo( ({message, isOwnerMessage, friendImg, ownerImg}) => {

    const [statusDisplay, setStatusDisplay] = useState(false)
    const dispatch = useDispatch()
    const style = isOwnerMessage ? "message_owner" : "message_friend"
   

    const viewMessageActualStatus = () => {
        if (message.viewed === true) {
            dispatch( actions.setRequestError({messageStatusRequestError: null}) )
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
                    <UserAvatar className="message__author-image" userImage={isOwnerMessage ? ownerImg : friendImg} linkTo={`/profile/${message.senderId}`} />
                    <UserName className="message__author-name" userName={message.senderName} linkTo={`/profile/${message.senderId}`} />
                    <div className="message__date"><Moment format="MMM DD YYYY hh:mm" date={message.addedAt} /></div>
                </div>
                <div className="message__text" id="dialog__message-text">{message.body}</div>
                {isOwnerMessage && !statusDisplay && <div className="check-status__btn" onClick={viewMessageActualStatus}>Check status</div>}
                {statusDisplay && <MessageStatus messageId={message.id} />}
            </div>
        </>
    )
})


const MessageStatus: React.FC<{messageId: string}> = ({messageId}) => {
    const viewedMessages = useSelector(dialogsSelectors.getViewedMessages)
    const MessageStatusRequestError = useSelector(dialogsSelectors.getMessageStatusRequestError)
    
    if (MessageStatusRequestError) {
        return <div className="message__status">
            <RequestError errorMessage={MessageStatusRequestError} />
        </div>
    }

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
    friendImg: string | null | undefined
    isOwnerMessage: boolean
    ownerImg: string | null | undefined
}