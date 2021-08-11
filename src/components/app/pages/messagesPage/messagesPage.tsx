import React from 'react';
import DialogsListContainer from './dialogsList/dialogsListContainer';
import DialogsItemContainer from './dialogsItem/dialogsItemContainer';
import {withAnonUserRedirect} from '../../../HOCs/withRedirect';

const MessagesPage: React.FC = () => {
    return (
        <>
            <DialogsListContainer />
            <DialogsItemContainer />
        </>
    )
}

export default withAnonUserRedirect(MessagesPage);