import React from 'react';
import DialogsListContainer from './dialogsList/dialogsListContainer';
import DialogsItemContainer from './dialogsItem/dialogsItemContainer';

const MessagesPage = (props) => {
    return (
        <>
            <DialogsListContainer store={props.store} />
            <DialogsItemContainer store={props.store} />
        </>
    )
}

export default MessagesPage;