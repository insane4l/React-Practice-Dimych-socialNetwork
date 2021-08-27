import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../reduxStore'
import { actions, startMessagesListening, stopMessagesListening } from '../../../../reducers/chatReducer'
import ChatMessagesList from './chatMessagesList'
import ChatMessageForm from './chatMessageForm'


const ChatPage: React.FC = () => {
    return (
        <Chat />
    )
}

const Chat = () => {

    const status = useSelector((state: AppStateType) => state.chat.status)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
            dispatch( actions.messagesReceived([]) )
        }
    }, [])

    return (
        <div className="dialogs__item">
            {status === 'error' && <div className="error-status">Connection error. Try refreshing the page</div>}
            
            <ChatMessagesList />
           
            <div className="dialogs__item-footer">
                <ChatMessageForm />
            </div>
        </div>
    )
}


export default ChatPage


