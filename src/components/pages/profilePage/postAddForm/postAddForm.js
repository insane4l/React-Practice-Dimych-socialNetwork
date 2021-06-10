import React from 'react';

import './postAddForm.scss';

const PostAddForm = (props) => {
    
    let newPostElement = React.createRef();
    

    const changeValue = () => {
        const value = newPostElement.current.value;
        debugger;
        props.dispatch({type: 'UPDATE_INPUT_VALUE', value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.dispatch({type: 'ADD_POST'});
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
                    ref={newPostElement}
                    value={props.state.profilePage.inputValue}
                    onChange={changeValue}>

                </textarea>
                <button className="add-post__btn">Post</button>
            </form>
        </div>
    )
}

export default PostAddForm;