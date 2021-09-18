import React from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../../../reduxStore'
import RequestError from '../../../../common/errors/requestError'
import SendMessageForm from '../../../../common/messagesComponents/sendMessageForm'


const DialogForm: React.FC<DialogFormPropsType> = ({sendMessage}) => {

    const sendingMessageError = useSelector( (state: AppStateType) => state.dialogsPage.requestErrors.sendingMessageError )
    
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