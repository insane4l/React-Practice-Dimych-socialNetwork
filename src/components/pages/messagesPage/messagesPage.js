import React from 'react';
import DialogsList from './dialogsList';
import DialogsItem from './dialogsItem';

const MessagesPage = (props) => {
    return (
        <>
            <DialogsList dialogs={props.state.messagesPage} />
            <DialogsItem dialogs={props.state.messagesPage} dispatch={props.dispatch} />
        </>
    )
}

export default MessagesPage;