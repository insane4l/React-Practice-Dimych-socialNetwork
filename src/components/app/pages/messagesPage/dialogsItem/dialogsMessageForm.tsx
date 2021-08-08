import React from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {required, maxLengthCreator} from '../../../../../utils/validation/validators'
import {createField, Textarea} from '../../../../common/formsControls/formsControls'
import { DialogsFormValuesType } from './dialogsItem';

const maxLength10 = maxLengthCreator(10);

type PropsType = {}
type DialogsFormValuesTypeKeys = Extract<keyof DialogsFormValuesType, string>

let DialogsMessageForm: React.FC<InjectedFormProps<DialogsFormValuesType, PropsType> & PropsType> = (props) => {

    return (
        <form 
            className="add-message__form"
            onSubmit={props.handleSubmit}>
            {createField<DialogsFormValuesTypeKeys>("messageBody", Textarea, [required, maxLength10],
                                                 "Type new message here..", {className: "add-message__input",
                                                 autoComplete: "off"})
            }
            <button className="add-message__btn">Send Message</button>
        </form>
    )
}

export default reduxForm<DialogsFormValuesType>({form: 'dialogsForm'})(DialogsMessageForm);