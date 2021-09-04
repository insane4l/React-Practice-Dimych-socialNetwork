import React from 'react'
import DialogsList from './dialogsList/dialogsList'
import DialogsItem from './dialogsItem/dialogsItem'
import {withAnonUserRedirect} from '../../../HOCs/withRedirect'


const DialogsPage: React.FC = () => {
    return (
        <>
            <DialogsList />
            <DialogsItem />
        </>
    )
}

export default withAnonUserRedirect(DialogsPage)