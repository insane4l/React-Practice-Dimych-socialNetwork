import React from 'react';
import DialogsListContainer from './dialogsList/dialogsListContainer';
import DialogsItem from './dialogsItem/dialogsItem';
import {withAnonUserRedirect} from '../../../HOCs/withRedirect';

const DialogsPage: React.FC = () => {
    return (
        <>
            <DialogsListContainer />
            <DialogsItem />
        </>
    )
}

export default withAnonUserRedirect(DialogsPage);