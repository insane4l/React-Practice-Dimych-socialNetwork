import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {required} from '../../../../../utils/validation/validators';
import {createField, Textarea} from '../../../../common/formsControls/formsControls';

import './postAddForm.scss';


type PostFormValuesType = {
    postBody: string
}
type PostFormValuesTypeKeys = Extract<keyof PostFormValuesType, string>

type FormOwnPropsType = {}

let ProfilePostsForm: React.FC< InjectedFormProps<PostFormValuesType, FormOwnPropsType> & FormOwnPropsType > = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className="add-post__form">
            {createField<PostFormValuesTypeKeys>("postBody", Textarea, [required],
                                                "Type new post message here..", {className: "add-post__textarea",
                                                maxLength: "1500"})}
            <button className="add-post__btn">Post</button>
        </form>
    )
}

const ProfilePostsReduxForm = reduxForm<PostFormValuesType, FormOwnPropsType>({form: "postsForm"})(ProfilePostsForm);


type PropsType = {
    addNewPost: (postBody: string) => void
}
const PostAddForm: React.FC<PropsType> = (props) => {

    const onFormSubmit = (formData: PostFormValuesType) => {
        props.addNewPost(formData.postBody);
    }

    return (
        <div className="add-post__block">
            <div className="add-post__title">Add new post</div>
            <ProfilePostsReduxForm onSubmit={onFormSubmit} />
        </div>
    )
}

export default PostAddForm;