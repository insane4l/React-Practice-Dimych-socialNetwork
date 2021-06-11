import React from 'react';

import './postAddForm.scss';

const PostAddForm = () => {
    return (
        <div className="add-post__block">
            <div className="add-post__title">Add new post</div>
            <form action="#" className="add-post__form">
                <textarea 
                    className="add-post__textarea"
                    name="new_post" 
                    placeholder="Type new post message here.."
                    maxlength="1500"
                    required>

                </textarea>
                <button className="add-post__btn">Post</button>
            </form>
        </div>
    )
}

export default PostAddForm;