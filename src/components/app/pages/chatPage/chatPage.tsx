import React, { FormEvent, useState } from 'react'
import { useEffect } from 'react'
// import {Link} from 'react-router-dom'
// import goBack from './goBack.svg'
import * as selectors from '../../../../selectors'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessageType } from '../../../../services/chatAPI'
import { AppStateType } from '../../../../reduxStore'
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../../../reducers/chatReducer'


const ChatPage: React.FC = () => {
    return (
        <Chat />
    )
}




const Chat = () => {

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div className="dialogs__item">
            <div className="dialogs__item-content" style={{height: "400px", overflow: "scroll"}}>
                <ChatMessagesList />
            </div>

            <div className="dialogs__item-footer">
                <ChatMessageForm />
            </div>
        </div>
    )
}

const ChatMessagesList: React.FC = () => {

    const authUserId = useSelector(selectors.getAuthUserId)
    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return (
        <>
        {messages.map((message, index) => {
            const style = message.userId === authUserId ? "message_right" : "message_left";
            return <ChatMessage key={index} message={message} style={style} />
        })}
        </>
    )
}


const ChatMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const sendMessageHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }
    return (
        <form onSubmit={sendMessageHandler} className="add-message__form" >
            <textarea 
                name="chatMessage"
                className="add-message__input"
                placeholder="Type new message here.."
                autoComplete="off"
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}></textarea>

            <button disabled={false} className="add-message__btn">Send Message</button>
        </form>
    )
}


const ChatMessage: React.FC<ChatMessagePropsType> = ({message, style}) => {
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
}


export default ChatPage


type ChatMessagePropsType = {
    message: ChatMessageType
    style: string
}