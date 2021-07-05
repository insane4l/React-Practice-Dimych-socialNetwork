import React from 'react';
import {Field, reduxForm} from 'redux-form';

import './postAddForm.scss';



let ProfilePostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className="add-post__form">
            <Field
                component="textarea" 
                className="add-post__textarea"
                name="postBody" 
                placeholder="Type new post message here.."
                maxLength="1500"
                required>

            </Field>
            <button className="add-post__btn">Post</button>
        </form>
    )
}

ProfilePostsForm = reduxForm({form: "postsForm"})(ProfilePostsForm);

const PostAddForm = (props) => {


    const onFormSubmit = (formData) => {
        props.addNewPost(formData.postBody);
    }

    return (
        <div className="add-post__block">
            <div className="add-post__title">Add new post</div>
            <ProfilePostsForm onSubmit={onFormSubmit} />
        </div>
    )
}

export default PostAddForm;