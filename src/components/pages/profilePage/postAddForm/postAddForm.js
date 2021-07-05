import React from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import {changeValueActionCreator, addPostActionCreator} from '../../../../store';
=======
// import {changePostValueAction, addPostAction} from '../../../../reducers/profilePageReducer';
>>>>>>> Presentation component and Container component without redux. Practice from 43 lesson
=======
>>>>>>> mapDispatchToProps refactoring. Show author profile (when authorized + click profile page)
=======
import {Field, reduxForm} from 'redux-form';
>>>>>>> redux-form Practice from 76 lesson

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

<<<<<<< HEAD
<<<<<<< HEAD
    const changeValue = () => {
        const value = newPostElement.current.value;
        props.dispatch(changeValueActionCreator(value))
=======
    const onChangeValue = (e) => {
        const value = e.target.value;
<<<<<<< HEAD
        props.changeInputValue(value);
>>>>>>> Presentation component and Container component without redux. Practice from 43 lesson
=======
        props.changePostValue(value);
>>>>>>> mapDispatchToProps refactoring. Show author profile (when authorized + click profile page)
    }

    const onSubmit = (e) => {
        e.preventDefault();
<<<<<<< HEAD
        props.dispatch(addPostActionCreator());
=======
        props.addNewPost();
>>>>>>> Presentation component and Container component without redux. Practice from 43 lesson
=======

    const onFormSubmit = (formData) => {
        props.addNewPost(formData.postBody);
>>>>>>> redux-form Practice from 76 lesson
    }

    return (
<<<<<<< HEAD
        <div className="add-post__block">
            <div className="add-post__title">Add new post</div>
<<<<<<< HEAD
            <form action="#" className="add-post__form">
=======
        <div className="post-add__block">
            <div className="post-add__title">Add new post</div>
            <form onSubmit={onSubmit} action="#" className="post-add__form">
>>>>>>> homework from 36 lesson (create own store, subscriber etc)
                <textarea 
                    className="add-post__textarea"
                    name="new_post" 
                    placeholder="Type new post message here.."
                    maxLength="1500"
                    required
                    value={props.inputValue}
                    onChange={onChangeValue}>

                </textarea>
                <button className="add-post__btn">Post</button>
            </form>
=======
            <ProfilePostsForm onSubmit={onFormSubmit} />
>>>>>>> redux-form Practice from 76 lesson
        </div>
    )
}

export default PostAddForm;