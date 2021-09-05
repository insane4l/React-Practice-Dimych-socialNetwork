import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import * as selectors from '../../../selectors'
import { DialogMessageType } from '../../../services/dialogsAPI'
import { ChatMessageType } from '../../../types/types'
import ChatMessage from '../../app/pages/chatPage/chatMessage'
import DialogMessage from '../../app/pages/dialogsPage/dialogsItem/dialogMessage'
import Spinner from '../spinner'

import './messagesList.scss'

const MessagesList: React.FC<MessagesListPropsType> = ({chatMessages, dialogMessages, isLoading}) => {

    const propsMessages = chatMessages || dialogMessages

    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const messagesAnchor = useRef<HTMLDivElement>(null)
    const authUserId = useSelector(selectors.getAuthUserId)

    const scrollHandler = (e: React.UIEvent<HTMLElement>) => {
        const element = e.currentTarget
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300)  {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect( () => {
        if (isAutoScroll) {
            messagesAnchor.current?.scrollIntoView({block: 'end', behavior: 'smooth'})
        }
        // eslint-disable-next-line
    }, [propsMessages])


    let MessagesList
    if (chatMessages) {
        MessagesList = chatMessages.map((message, index) => {
            const style = message.userId === authUserId ? "message_right" : "message_left"
            return <ChatMessage key={index} message={message} style={style} /> //todo: need generate id for key
        })
    } else {
        MessagesList = dialogMessages?.map((message) => {
            let style = message.senderId === authUserId ? "message_right" : "message_left"
            if (message.viewed) {style = `${style} message_viewed`}
            return <DialogMessage key={message.id} message={message} style={style} />
        })
    }

    return (
        <div className="messages__list" onScroll={scrollHandler}>
            {isLoading ? <Spinner/> : MessagesList}
            <div ref={messagesAnchor}></div>
        </div>
    )
}

export default MessagesList



type MessagesListPropsType = {
    chatMessages?: ChatMessageType[]
    dialogMessages?: DialogMessageType[]
    isLoading: boolean
}