import React from 'react';
import {Link} from 'react-router-dom';
import DialogsMessageForm from './dialogsMessageForm';
import { DialogsMessageType } from '../../../../../reducers/messagesPageReducer';

import goBack from './goBack.svg';
import './dialogsItem.scss';

type PropsType = {
    //MapStatePropsType
    messages: Array<DialogsMessageType>
    //MapDispatchPropsType
    sendMessage: (date: string, messageBody: string) => void
}

export type DialogsFormValuesType = { messageBody: string }

const DialogsItem: React.FC<PropsType> = (props) => {

    const onFormSubmit = (formData: DialogsFormValuesType) => {
        // const newDate = new Date();
        // const day = newDate.getDate();
        // const month = newDate.getMonth() +1;
        // const hours = newDate.getHours() % 24;
        // const minutes = newDate.getMinutes() % 60;

        // const date = `${day}.${month} ${hours}:${minutes}`;
        // utils function
        // const date = getCurrentDate();
        const date = '22-02-2020';
        props.sendMessage(date, formData.messageBody);
    }

    return (
        <div className="dialogs__item">
            <div className="dialogs__item-header">
                <Link className="go-back" to="/messages"> 
                    <img className="go-back__icon" src={goBack} alt="go_back_icon" />
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
                {props.messages.map(message => {
                    const style = message.myMessage ? "message_right" : "message_left";
                    return (
                        <div key={message.id} className={`message ${style}`}>
                            <div className="message__info">
                                <div className="message__author-image">
                                    <img src="https://tehnot.com/wp-content/uploads/2017/09/pavel.jpg" alt="author_image" />
                                </div>
                                <div className="message__author-name">Pavel Durov</div>
                                <div className="message__date">{message.date}</div>
                            </div>
                            <div className="message__text">{message.label}</div>
                        </div>
                    )
                })}
            </div>

            <div className="dialogs__item-footer">
                <DialogsMessageForm onSubmit={onFormSubmit} />
            </div>
        </div>
    )
}

export default DialogsItem;