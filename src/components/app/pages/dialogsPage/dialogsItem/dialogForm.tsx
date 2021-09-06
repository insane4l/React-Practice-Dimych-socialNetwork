import React from 'react'
import SendMessageForm from '../../../../common/messagesComponents/sendMessageForm'


const DialogForm: React.FC<DialogFormPropsType> = ({sendMessage}) => {

    return (
        <SendMessageForm
            fieldName="dialogMessage"
            btnDisabled={false}
            sendMessage={sendMessage} />
    )
}

export default DialogForm



type DialogFormPropsType = {
    sendMessage: (message: string) => void
}