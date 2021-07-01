import React from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import {changeValueActionCreator, addPostActionCreator} from '../../../../store';
=======
// import {changePostValueAction, addPostAction} from '../../../../reducers/profilePageReducer';
>>>>>>> Presentation component and Container component without redux. Practice from 43 lesson
=======
>>>>>>> mapDispatchToProps refactoring. Show author profile (when authorized + click profile page)

import './postAddForm.scss';

const PostAddForm = (props) => {

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
    }

    return (
<<<<<<< HEAD
        <div className="add-post__block">
            <div className="add-post__title">Add new post</div>
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
        </div>
    )
}

export default PostAddForm;