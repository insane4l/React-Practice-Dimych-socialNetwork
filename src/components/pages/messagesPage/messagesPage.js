import React from 'react';
import DialogsListContainer from './dialogsList/dialogsListContainer';
import DialogsItemContainer from './dialogsItem/dialogsItemContainer';

const MessagesPage = () => {
    return (
        <>
<<<<<<< HEAD
            <DialogsList />
            <DialogsItem />
=======
            <DialogsListContainer store={props.store} />
            <DialogsItemContainer store={props.store} />
>>>>>>> Presentation component and Container component without redux. Practice from 43 lesson
        </>
    )
}

export default MessagesPage;