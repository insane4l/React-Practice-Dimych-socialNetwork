import React from 'react'
import { useSelector } from 'react-redux'
import { sendMessage } from '../../../../reducers/chatReducer'
import { AppStateType } from '../../../../reduxStore'
import SendMessageForm from '../../../common/sendMessageForm/sendMessageForm'


const ChatForm = () => {
    const status = useSelector((state: AppStateType) => state.chat.status)

    return (
        <SendMessageForm
            fieldName="chatMessage"
            btnDisabled={status !== 'ready'}
            sendMessage={sendMessage} />
    )
}

export default ChatForm