import React, { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../../../../reducers/chatReducer'
import { AppStateType } from '../../../../reduxStore'


const ChatMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

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
                name="chatMessage"
                className="add-message__input"
                placeholder="Type new message here.."
                autoComplete="off"
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}></textarea>

            <button disabled={status !== 'ready'} className="add-message__btn">Send Message</button>
        </form>
    )
}

export default ChatMessageForm