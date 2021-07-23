import React from 'react';
import {Link} from 'react-router-dom';
import DialogsMessageForm from './dialogsMessageForm';

import goBack from './goBack.svg';
import './dialogsItem.scss';

const DialogsItem = (props) => {

    const onFormSubmit = (formData) => {
        props.sendMessage(formData.messageBody);
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
                {props.dialogs.dialogsList[0].messages.map(message => {
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
                {/* <div className="message message_left">
                    <div className="message__info">
                        <div className="message__author-image">
                            <img src="https://tehnot.com/wp-content/uploads/2017/09/pavel.jpg" alt="author_image" />
                        </div>
                        <div className="message__author-name">Pavel Durov</div>
                        <div className="message__date">11 June 22:55</div>
                    </div>
                    <div className="message__text">{props.dialogs.dialogsList[0].messages[0].label}</div>
                </div>
                <div className="message message_right">
                    <div className="message__info">
                        <div className="message__author-image">
                            <img src="https://img3.goodfon.ru/wallpaper/nbig/3/be/cat-kitten-feline-animal-eyes.jpg" alt="author_image" />
                        </div>
                        <div className="message__author-name">Roman Karpeyev</div>
                        <div className="message__date">11 June 22:57</div>
                    </div>
                    <div className="message__text">{props.dialogs.dialogsList[0].messages[1].label}</div>
                </div> */}
            </div>

            <div className="dialogs__item-footer">
                <DialogsMessageForm onSubmit={onFormSubmit} />
            </div>
        </div>
    )
}

export default DialogsItem;