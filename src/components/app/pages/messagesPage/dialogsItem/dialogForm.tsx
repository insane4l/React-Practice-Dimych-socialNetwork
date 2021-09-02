import React from 'react'
import { actions } from '../../../../../reducers/messagesReducer'
import SendMessageForm from '../../../../common/sendMessageForm/sendMessageForm'


const DialogForm: React.FC = () => {
    
    return (
        <SendMessageForm
            fieldName="dialogMessage"
            btnDisabled={false}
            sendMessage={actions.sendMessageAction} />
    )
}

export default DialogForm