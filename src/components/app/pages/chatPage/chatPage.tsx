import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../reduxStore'
import { actions, startMessagesListening, stopMessagesListening } from '../../../../reducers/chatReducer'
import ChatForm from './chatForm'
import MessagesList from '../../../common/messagesComponents/messagesList'

import './chatPage.scss'

const ChatPage: React.FC = () => {
    return (
        <Chat />
    )
}

const Chat = () => {

    const status = useSelector((state: AppStateType) => state.chat.status)
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const dispatch = useDispatch()
    
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
            
            <MessagesList messages={messages}/>
           
            <ChatForm />
            

        </div>
    )
}


export default ChatPage


