import React from 'react';
import DialogsListContainer from './dialogsList/dialogsListContainer';
import DialogsItemContainer from './dialogsItem/dialogsItemContainer';

const MessagesPage = () => {
    return (
        <>
<<<<<<< HEAD
<<<<<<< HEAD
            <DialogsList />
            <DialogsItem />
=======
            <DialogsListContainer store={props.store} />
            <DialogsItemContainer store={props.store} />
>>>>>>> Presentation component and Container component without redux. Practice from 43 lesson
=======
            <DialogsListContainer />
            <DialogsItemContainer />
>>>>>>> Context API: createContext, Provider, Consumer added (without react-redux), deleted props drilling. Practice from 44 lesson
        </>
    )
}

export default MessagesPage;