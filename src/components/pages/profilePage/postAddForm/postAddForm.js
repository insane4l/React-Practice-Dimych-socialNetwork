import React from 'react';

import './postAddForm.scss';

const PostAddForm = (props) => {

    const onChangeValue = (e) => {
        const value = e.target.value;
        props.changePostValue(value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.addNewPost();
    }

    return (
        <div className="add-post__block">
            <div className="add-post__title">Add new post</div>
            <form onSubmit={onSubmit} action="#" className="add-post__form">
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