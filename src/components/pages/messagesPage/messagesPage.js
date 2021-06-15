import React from 'react';
import DialogsListContainer from './dialogsList/dialogsListContainer';
import DialogsItemContainer from './dialogsItem/dialogsItemContainer';

const MessagesPage = () => {
    return (
        <>
            <DialogsListContainer />
            <DialogsItemContainer />
        </>
    )
}

export default MessagesPage;