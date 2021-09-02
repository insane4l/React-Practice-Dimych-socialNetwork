import React from 'react'
import { actions } from '../../../../../reducers/dialogsReducer'
import SendMessageForm from '../../../../common/messagesComponents/sendMessageForm'


const DialogForm: React.FC = () => {

    return (
        <SendMessageForm
            fieldName="dialogMessage"
            btnDisabled={false}
            sendMessage={actions.sendMessageAction} />
    )
}

export default DialogForm