import React from 'react';
import DialogsItem from './';
import {changeMessageValueAction, sendMessageAction} from '../../../../reducers/messagesPageReducer';
import StoreContext from '../../../storeContext/storeContext';

const DialogsItemContainer = () => {

    return (
        <StoreContext.Consumer>
            {
               (store) => {

                const changeMessage = (text) => {
                    const action = changeMessageValueAction(text);
                    store.dispatch(action);
                }
            
                const sendMessage = () => {
                    const newDate = new Date();
                    const day = newDate.getDate();
                    const month = newDate.getMonth() +1;
                    const hours = newDate.getHours() % 24;
                    const minutes = newDate.getMinutes() % 60;
            
                    const date = `${day}.${month} ${hours}:${minutes}`;
            
                    const action = sendMessageAction(date);
            
                    store.dispatch(action);
                }
                return (
                    <DialogsItem 
                        dialogs={store.getState().messagesPage}
                        changeMessage={changeMessage}
                        sendMessage={sendMessage} />
                    )
               } 
            }
        </StoreContext.Consumer>
    )
}

export default DialogsItemContainer;