import React from 'react';
import DialogsList from './';
import StoreContext from '../../../storeContext/storeContext'


const DialogsListContainer = () => {
    return (
        <StoreContext.Consumer>
            {
                (store) => <DialogsList dialogs={store.getState().messagesPage}/>
            }
        </StoreContext.Consumer>
    )
}

export default DialogsListContainer;