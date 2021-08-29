import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../../reduxStore'
import * as selectors from '../../../../selectors'
import { ChatMessageType } from '../../../../services/chatAPI'

const ChatMessagesList: React.FC = () => {

    const [isAutoScroll, setIsAutoScroll] = useState(false)
    const messagesAnchor = useRef<HTMLDivElement>(null)
    const authUserId = useSelector(selectors.getAuthUserId)
    const messages = useSelector((state: AppStateType) => state.chat.messages)


    
    const scrollHandler = (e: React.UIEvent<HTMLElement>) => {
        const element = e.currentTarget
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300)  {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
           
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchor.current?.scrollIntoView({block: 'end', behavior: 'smooth'})
        }
        // eslint-disable-next-line
    }, [messages])

    return (
        <>
        <div className="dialogs__item-content" style={{height: "400px", overflow: "scroll"}} onScroll={scrollHandler}>
            {messages.map((message, index) => {
                const style = message.userId === authUserId ? "message_right" : "message_left";
                return <ChatMessage key={index} message={message} style={style} />
            })}
            <div ref={messagesAnchor}></div>
        </div>
        </>
    )
}


const ChatMessage: React.FC<ChatMessagePropsType> = React.memo( ({message, style}) => {
    console.log('MESSAGE rerendered');
    return (
        <div className={`message ${style}`}>
            <div className="message__info">
                <div className="message__author-image">
                    <img src={message.photo} alt="author_image" />
                </div>
                <div className="message__author-name">{message.userName}</div>
            </div>
            <div className="message__text">{message.message}</div>
        </div>
    )
})


export default ChatMessagesList


type ChatMessagePropsType = {
    message: ChatMessageType
    style: string
}