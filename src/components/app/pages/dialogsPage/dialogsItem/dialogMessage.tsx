import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions, requestMessageStatus } from '../../../../../reducers/dialogsReducer'
import { AppStateType } from '../../../../../reduxStore'
import { DialogMessageType } from '../../../../../services/dialogsAPI'

import '../../../../common/messagesComponents/message.scss'


const DialogMessage: React.FC<MessagePropsType> = React.memo( ({message, isOwnerMessage}) => {
    console.log('MESSAGE rerendered');
    const [statusDisplay, setStatusDisplay] = useState(false)
    
    const dispatch = useDispatch()
    // let checkViewedStatus = () => {
    //     debugger
    //     for ( let key in selectedMessagesViewedStatus ) {
    //         debugger
    //         if (String(key) === message.id) {
    //             return selectedMessagesViewedStatus[key]
    //         }
    //     }
    // }
    // const messageViewedStatus = checkViewedStatus()
    // console.log(messageViewedStatus);

    let style = isOwnerMessage ? "message_owner" : "message_friend"
   
    
    const actionWithOwnerMessage = () => {
        if (isOwnerMessage) {
            viewMessageActualStatus()
        }
    }
    const viewMessageActualStatus = () => {
        if (statusDisplay) {
            setStatusDisplay(false)
            return
        } 
        if (statusDisplay === false && message.viewed === true) {
            dispatch( actions.addMessageToViewed(message.id) ) // add to viewed arr, because of arr.some() --- "Has been VIEWED"
            showStatus(4)
        }
        if (statusDisplay === false && message.viewed === false) { // if message initial viewed false, request API actual status
            dispatch( requestMessageStatus(message.id) ) 
            showStatus(4)
        }
    }
    const showStatus = (seconds: number) => {
        const milliseconds = seconds * 1000
        setStatusDisplay(true)
        const timerId = setTimeout(() => { setStatusDisplay(false) }, milliseconds) // todo: how to clear timeout when 2nd click (when setStatusDisplay(false))
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
                <div className="message__text" id="dialog__message-text" onClick={actionWithOwnerMessage}>{message.body}</div>
            </div>
            {statusDisplay && <MessageStatus messageId={message.id} />}
        </>
    )
})

export default DialogMessage

const MessageStatus: React.FC<{messageId: string}> = ({messageId}) => {
    const viewedMessages = useSelector( (state: AppStateType) => state.dialogsPage.viewedMessages)
    console.log('STATUS rerendered');
    return (
        <div className="message__status">
            { viewedMessages.some(id => id === messageId) 
                ? "Has been VIEWED" 
                : "Has NOT been VIEWED" }
        </div>
        
    )
}

type MessagePropsType = {
    message: DialogMessageType
    isOwnerMessage: boolean
}