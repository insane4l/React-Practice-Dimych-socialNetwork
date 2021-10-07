import React from 'react'
import SendMessageForm from '../../../common/messagesComponents/sendMessageForm'


const ChatForm: React.FC<ChatFormPropsType> = ({sendMessage, status}) => {

    return (
        <SendMessageForm
            fieldName="chatMessage"
            btnDisabled={status !== 'ready'}
            sendMessage={sendMessage} />
    )
}

export default ChatForm



type ChatFormPropsType = {
    sendMessage: (message: string) => void
    status: string
}