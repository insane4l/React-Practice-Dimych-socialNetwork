import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../reduxStore'
import { actions, sendMessage, startMessagesListening, stopMessagesListening } from '../../../../reducers/chatReducer'
import ChatForm from './chatForm'

import './chatPage.scss'
import MessagesList from '../../../common/messagesComponents/messagesList'

const ChatPage: React.FC = () => {
    return (
        <Chat />
    )
}

const Chat = () => {

    const status = useSelector((state: AppStateType) => state.chat.status)
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const dispatch = useDispatch()

    const sendChatMessage = (message: string) => {
        dispatch( sendMessage(message) )
    }
    
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
            dispatch( actions.messagesCleaned() )
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="chat__page">
            {status === 'error' && <div className="error-status">Connection error. Try refreshing the page</div>}
            
            <MessagesList chatMessages={messages} isLoading={status === 'pending' ? true : false} />
           
            <ChatForm sendMessage={sendChatMessage} status={status} />
            

        </div>
    )
}


export default ChatPage


