import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'


const SendMessageForm: React.FC<SendMessagePropsType> = ({fieldName, btnDisabled, sendMessage}) => {

    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const sendMessageHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <form onSubmit={sendMessageHandler} className="add-message__form" >
            <textarea 
                name={fieldName}
                className="add-message__input"
                placeholder="Type new message here.."
                autoComplete="off"
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)} />

            <button disabled={btnDisabled || !message} className="add-message__btn">Send Message</button>
        </form>
    )
}

export default SendMessageForm



type SendMessagePropsType = {
    fieldName: string
    btnDisabled: boolean
    sendMessage: (message: string) => void
}