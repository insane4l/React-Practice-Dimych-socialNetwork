import React from 'react'
import {Link} from 'react-router-dom'
import DialogForm from './dialogForm'
import * as icons from '../../../../../assets/icons'
import './dialogsItem.scss'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../../../reduxStore'


const DialogsItem: React.FC = () => {

    const messages = useSelector( (state: AppStateType) => state.messagesPage.messages )
    const authId = useSelector( (state: AppStateType) => state.auth.id )

    return (
        <div className="dialogs__item">
            <div className="dialogs__item-header">
                <Link className="go-back" to="/messages"> 
                    <img className="go-back__icon" src={icons.goBack} alt="go_back_icon" />
                    <div className="go-back__text">Go back</div>
                </Link>
                {/* Must be link too */}
                <div className="interlocuter">
                    <div className="interlocuter__image">
                        <img src="https://tehnot.com/wp-content/uploads/2017/09/pavel.jpg" alt="interlocuter_image" />
                    </div>
                    <div className="interlocuter__name">Pavel Durov</div>
                </div>
            </div>

            <div className="dialogs__item-content">
                {messages.map(message => {
                    const style = message.userId === authId ? "message_right" : "message_left"
                    return (
                        <div key={message.message} className={`message ${style}`}>
                            <div className="message__info">
                                <div className="message__author-image">
                                    <img src="https://tehnot.com/wp-content/uploads/2017/09/pavel.jpg" alt="author_image" />
                                </div>
                                <div className="message__author-name">Pavel Durov</div>
                                <div className="message__date">22.05.2021</div>
                            </div>
                            <div className="message__text">{message.message}</div>
                        </div>
                    )
                })}
            </div>

            <div className="dialogs__item-footer">
                <DialogForm />
            </div>
        </div>
    )
}

export default DialogsItem


export type DialogsFormValuesType = { messageBody: string }