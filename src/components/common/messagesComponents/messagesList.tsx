import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import * as selectors from '../../../selectors'
import { MessageType } from '../../../types/types'
import Message from './message'

import './messagesList.scss'

const MessagesList: React.FC<MessagesListPropsType> = ({messages}) => {

    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const messagesAnchor = useRef<HTMLDivElement>(null)
    const authUserId = useSelector(selectors.getAuthUserId)
    // const messages = useSelector((state: AppStateType) => state.chat.messages)

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
    }, [messages])

    return (
        <div className="messages__list" onScroll={scrollHandler}>
            {messages.map((message, index) => {
                const style = message.userId === authUserId ? "message_right" : "message_left";
                return <Message key={index} message={message} style={style} />
            })}
            <div ref={messagesAnchor}></div>
        </div>
    )
}

export default MessagesList



type MessagesListPropsType = {
    messages: MessageType[]
}