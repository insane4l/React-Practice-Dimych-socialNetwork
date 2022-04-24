import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, sendMessage, startMessagesListening, stopMessagesListening } from '../../../../reducers/chatReducer'
import ChatForm from './chatForm'
import MessagesList from '../../../common/messagesComponents/messagesList'
import { withAnonUserRedirect } from '../../../HOCs/withRedirect'
import * as chatSelectors from '../../../../selectors/chat'
import AppPage from '../../../common/appPage/AppPage'

import './chatPage.scss'


const ChatPage: React.FC = () => {
    return (
        <Chat />
    )
}

const Chat = () => {

    const status = useSelector(chatSelectors.getStatus)
    const messages = useSelector(chatSelectors.getMessages)
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
    }, [dispatch])

    return (
        <AppPage pageTitle="Developers Chat">

            <div className="chat__page">
                {status === 'error' && <div className="error-status">Connection error. Try refreshing the page</div>}
                <div className="chat__page-header">Developers Chat</div>
                <MessagesList chatMessages={messages} isLoading={status === 'pending' ? true : false} />
            
                <ChatForm sendMessage={sendChatMessage} status={status} />
            </div>

        </AppPage>
        
    )
}


export default withAnonUserRedirect(ChatPage)


