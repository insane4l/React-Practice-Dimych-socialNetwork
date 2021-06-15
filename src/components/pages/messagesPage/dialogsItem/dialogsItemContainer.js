import React from 'react';
import DialogsItem from './';
import {changeMessageValueAction, sendMessageAction} from '../../../../reducers/messagesPageReducer';

const DialogsItemContainer = (props) => {

    const state = props.store.getState();

    const changeMessage = (text) => {
        const action = changeMessageValueAction(text);
        props.store.dispatch(action);
    }

    const sendMessage = () => {
        const newDate = new Date();
        const day = newDate.getDate();
        const month = newDate.getMonth() +1;
        const hours = newDate.getHours() % 24;
        const minutes = newDate.getMinutes() % 60;

        const date = `${day}.${month} ${hours}:${minutes}`;

        const action = sendMessageAction(date);

        props.store.dispatch(action);
    }

    return <DialogsItem dialogs={state.messagesPage} changeMessage={changeMessage} sendMessage={sendMessage} />
}

export default DialogsItemContainer;