import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {required, maxLengthCreator} from '../../../../utils/validation/validators';
import {Textarea} from '../../../common/formsControls/formsControls';


const maxLength10 = maxLengthCreator(10);

let DialogsMessageForm = (props) => {

    return (
        <form 
            className="add-message__form"
            action="#"
            onSubmit={props.handleSubmit}>
            <Field
                validate={[required, maxLength10]}
                component={Textarea}
                className="add-message__input"
                name="messageBody" 
                placeholder="Type new message here.."
                autoComplete="off">
            </Field>
            <button className="add-message__btn">Send Message</button>
        </form>
    )
}

DialogsMessageForm = reduxForm({form: 'dialogsForm'})(DialogsMessageForm)

export default DialogsMessageForm;