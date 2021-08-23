import React, { FormEvent, useState } from 'react'
import { useEffect } from 'react'
// import {Link} from 'react-router-dom'
// import goBack from './goBack.svg'
import * as selectors from '../../../../selectors'
import { useSelector } from 'react-redux'


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
    const [wsChannel, setWSChannel] = useState<WebSocket | null>(null)
    
    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => { // does not work when the Internet is disconnected, WHY??
            console.log('WebSocket channel CLOSED');
            setTimeout(createChannel, 4000)
        }

        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWSChannel(ws)
        }
        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])


    return (
        <div className="dialogs__item">
            <div className="dialogs__item-content" style={{height: "400px", overflow: "scroll"}}>
                <ChatMessagesList wsChannel={wsChannel} />
            </div>

            <div className="dialogs__item-footer">
                <ChatMessageForm wsChannel={wsChannel}/>
            </div>
        </div>
    )
}

const ChatMessagesList: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

    const authUserId = useSelector(selectors.getAuthUserId)
    const [messages, setMessages] = useState<Array<ChatMessageType>>([])

    useEffect(() => {
        const messageHandler =  (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data)
            setMessages(prevMessages => [...prevMessages, ...newMessages])
        }
        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])

    return (
        <>
        {messages.map((message, index) => {
            const style = message.userId === authUserId ? "message_right" : "message_left";
            return <ChatMessage key={index} message={message} style={style} />
        })}
        </>
    )
}


const ChatMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus('ready')
        }
        wsChannel?.addEventListener('open', openHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])

    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!message) {
            return
        }
        wsChannel?.send(message)
        setMessage('')
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

            <button disabled={wsChannel === null || readyStatus !== 'ready'} className="add-message__btn">Send Message</button>
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