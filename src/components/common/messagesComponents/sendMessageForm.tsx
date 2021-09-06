import React, { FormEvent, KeyboardEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import './sendMessageForm.scss'


const SendMessageForm: React.FC<SendMessagePropsType> = ({fieldName, btnDisabled, sendMessage}) => {

    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const sendMessageHandler = (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault()
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === 'Enter' && e.shiftKey === false) {
            e.preventDefault();
            sendMessageHandler()
        }
    }

    return (
        <form onSubmit={sendMessageHandler} className="send-message__form" >
            <textarea 
                name={fieldName}
                className="send-message__input"
                placeholder="Type new message here.."
                autoComplete="off"
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
                onKeyDown={onEnterPress} />

            <button disabled={btnDisabled || !message} className="send-message__btn">Send Message</button>
        </form>
    )
}

export default SendMessageForm



type SendMessagePropsType = {
    fieldName: string
    btnDisabled: boolean
    sendMessage: (message: string) => void
}