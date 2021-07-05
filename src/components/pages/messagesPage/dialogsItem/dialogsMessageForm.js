import React from 'react';
import {reduxForm, Field} from 'redux-form';

let DialogsMessageForm = (props) => {
    return (
        <form 
            className="add-message__form"
            action="#"
            onSubmit={props.handleSubmit}>
            <Field
                component="input"
                className="add-message__input"
                name="messageBody" 
                placeholder="Type new message here.."
                autoComplete="off"
                required>
            </Field>
            <button className="add-message__btn">Send Message</button>
        </form>
    )
}

DialogsMessageForm = reduxForm({form: 'dialogsForm'})(DialogsMessageForm)

export default DialogsMessageForm;