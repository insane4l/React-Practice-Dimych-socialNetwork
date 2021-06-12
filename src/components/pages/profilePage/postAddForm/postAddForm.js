import React from 'react';
import {changePostValueAction, addPostAction} from '../../../../store';

import './postAddForm.scss';

const PostAddForm = (props) => {
    
    let newPostElement = React.createRef();
    

    const changeValue = () => {
        const value = newPostElement.current.value;
        props.dispatch(changePostValueAction(value))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.dispatch(addPostAction());
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