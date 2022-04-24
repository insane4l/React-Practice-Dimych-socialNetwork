import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import * as authSelectors from '../../../selectors/auth'
import { DialogMessageType } from '../../../services/dialogsAPI'
import { ChatMessageType } from '../../../types/types'
import ChatMessage from '../../app/pages/chatPage/chatMessage'
import DialogMessage from '../../app/pages/dialogsPage/dialogsItem/dialogMessage'
import DialogPagination from '../../app/pages/dialogsPage/dialogsItem/dialogPagination'
import Spinner from '../spinner'

import './messagesList.scss'


const MessagesList: React.FC<MessagesListPropsType> = React.memo( ({chatMessages, dialogMessages, dialogMessagesPortionSize, isLoading, friendId, friendImg, ownerImg}) => {

    const propsMessages = chatMessages || dialogMessages

    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const messagesAnchor = useRef<HTMLDivElement>(null)
    const authUserId = useSelector(authSelectors.getAuthUserId)

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
            return <ChatMessage 
                        key={index} //todo: need generate id for key
                        message={message} 
                        isOwnerMessage={message.userId === authUserId ? true : false} /> 
        })
    } else {
        MessagesList = dialogMessages?.map((message) => {
            return <DialogMessage
                        key={message.id} 
                        message={message} 
                        friendImg={friendImg}
                        ownerImg={ownerImg}
                        isOwnerMessage={message.senderId === authUserId ? true : false} />
        })
    }

    return (
        <div className="messages__list" onScroll={scrollHandler}>
            {!chatMessages && <DialogPagination messagesPortionSize={dialogMessagesPortionSize || 10} userId={friendId}/>}
            {isLoading ? <Spinner/> : MessagesList}
            <div ref={messagesAnchor}></div>
        </div>
    )
})

export default MessagesList



type MessagesListPropsType = {
    chatMessages?: ChatMessageType[]
    dialogMessages?: DialogMessageType[]
    dialogMessagesPortionSize?: number
    friendId?: number
    friendImg?: string | null | undefined
    ownerImg?: string | null | undefined
    isLoading: boolean
}