import React from 'react';
import DialogsList from './';


const DialogsListContainer = (props) => {
    const state = props.store.getState();
    return <DialogsList dialogs={state.messagesPage}/>
}

export default DialogsListContainer;