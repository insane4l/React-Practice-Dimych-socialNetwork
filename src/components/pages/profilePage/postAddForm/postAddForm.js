import React from 'react';

import './postAddForm.scss';

const PostAddForm = () => {
    return (
        <div className="post-add__block">
            <div className="post-add__title">Add new post</div>
            <form action="" className="post-add__form">
                <textarea 
                    className="post-add__textarea"
                    name="new_post" 
                    placeholder="Type new post message here.."
                    maxlength="1500"
                    required>

                </textarea>
                <button className="button post-add__btn">Post</button>
            </form>
        </div>
    )
}

export default PostAddForm;