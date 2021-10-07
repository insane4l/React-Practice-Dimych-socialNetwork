import React from 'react'
import { useSelector } from 'react-redux'
import RequestError from '../../../../common/errors/requestError'
import SendMessageForm from '../../../../common/messagesComponents/sendMessageForm'
import * as dialogsSelectors from '../../../../../selectors/dialogs'


const DialogForm: React.FC<DialogFormPropsType> = ({sendMessage}) => {

    const sendingMessageError = useSelector(dialogsSelectors.getSendingMessageError)
    
    return (
        <>
            <SendMessageForm
                fieldName="dialogMessage"
                btnDisabled={false}
                sendMessage={sendMessage} />

            {sendingMessageError && <RequestError errorMessage={sendingMessageError} />}
        </>
    )
}

export default DialogForm



type DialogFormPropsType = {
    sendMessage: (message: string) => void
}