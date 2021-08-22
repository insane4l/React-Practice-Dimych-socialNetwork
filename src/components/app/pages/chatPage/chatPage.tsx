import React, { FormEvent, useState } from 'react'
import { useEffect } from 'react'
import { required } from '../../../../utils/validation/validators'
import { Textarea } from '../../../common/formsControls/formsControls'
// import {Link} from 'react-router-dom'
// import goBack from './goBack.svg'
import * as selectors from '../../../../selectors/'
import { useSelector } from 'react-redux'

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const ChatPage: React.FC = () => {
    return (
        <Chat />
    )
}



type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
const Chat = () => {
    const authUserId = useSelector(selectors.getAuthUserId)
    const [messages, setMessages] = useState<Array<ChatMessageType>>([])
    
    useEffect(() => {
        ws.addEventListener('message', (e) => {
            const newMessages = JSON.parse(e.data)
            console.log(newMessages);
            setMessages(prevMessages => [...prevMessages, ...newMessages])
        })
        //eslint-disable-next-line
    }, [])

    const messagesList = messages.map((message, index) => {
        const style = message.userId === authUserId ? "message_right" : "message_left";
        return <ChatMessage key={index} message={message} style={style} />
    })

    return (
        <div className="dialogs__item">
            {/* <div className="dialogs__item-header">
                <Link className="go-back" to="/messages"> 
                    <img className="go-back__icon" src={goBack} alt="go_back_icon" />
                    <div className="go-back__text">Go back</div>
                </Link>
            </div> */}

            <div className="dialogs__item-content" style={{height: "400px", overflow: "scroll"}}>
                {messagesList}
            </div>

            <div className="dialogs__item-footer">
                <ChatMessageForm />
            </div>
        </div>
    )
}


const ChatMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')

    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!message) {
            return
        }
        ws.send(message)
    }
    return (
        <form onSubmit={sendMessage} className="add-message__form" >
            <textarea 
                name="chatMessage"
                className="add-message__input"
                placeholder="Type new message here.."
                autoComplete="off"
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}></textarea>

            <button className="add-message__btn">Send Message</button>
        </form>
    )
}




type ChatMessagePropsType = {
    message: ChatMessageType
    style: string
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