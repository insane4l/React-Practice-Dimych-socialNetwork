import React from 'react';
import {Link} from 'react-router-dom';
import DialogsMessageForm from './dialogsMessageForm';

import goBack from './goBack.svg';
import './dialogsItem.scss';

<<<<<<< HEAD
const DialogsItem = () => {
=======
const DialogsItem = (props) => {

    const onFormSubmit = (formData) => {
        props.sendMessage(formData.messageBody);
    }

>>>>>>> Presentation component and Container component without redux. Practice from 43 lesson
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
                <div className="message message_left">
                    <div className="message__info">
                        <div className="message__author-image">
                            <img src="https://tehnot.com/wp-content/uploads/2017/09/pavel.jpg" alt="author_image" />
                        </div>
                        <div className="message__author-name">Pavel Durov</div>
                        <div className="message__date">11 June 22:55</div>
                    </div>
                    <div className="message__text">Hi where are u?</div>
                </div>
                <div className="message message_right">
                    <div className="message__info">
                        <div className="message__author-image">
                            <img src="https://img3.goodfon.ru/wallpaper/nbig/3/be/cat-kitten-feline-animal-eyes.jpg" alt="author_image" />
                        </div>
                        <div className="message__author-name">Roman Karpeyev</div>
                        <div className="message__date">11 June 22:57</div>
                    </div>
                    <div className="message__text">Hi! Im in Tallinn right now</div>
                </div>
            </div>

            <div className="dialogs__item-footer">
<<<<<<< HEAD
<<<<<<< HEAD
                <form className="add-message__form" action="#">
=======
                <form 
                    className="add-message__form"
                    action="#"
                    onSubmit={onSendMessage}>
>>>>>>> Presentation component and Container component without redux. Practice from 43 lesson
                    <input 
                        className="add-message__input"
                        name="new_message" 
                        placeholder="Type new message here.."
<<<<<<< HEAD
=======
                        autoComplete="off"
                        value={props.dialogs.newMessageBody}
                        onChange={onChangeMessage}
>>>>>>> Presentation component and Container component without redux. Practice from 43 lesson
                        required>
                    </input>
                    <button className="add-message__btn">Send Message</button>
                </form>
=======
                <DialogsMessageForm onSubmit={onFormSubmit} />
>>>>>>> redux-form Practice from 76 lesson
            </div>
        </div>
    )
}

export default DialogsItem;