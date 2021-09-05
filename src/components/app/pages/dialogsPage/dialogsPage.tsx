import React from 'react'
import DialogsList from './dialogsList/dialogsList'
import DialogsItem from './dialogsItem/dialogsItem'
import {withAnonUserRedirect} from '../../../HOCs/withRedirect'
import { Route, Switch } from 'react-router-dom'


const DialogsPage: React.FC = () => {
    return (
        <Switch >
            <Route exact path="/dialogs" component={DialogsList} />
            <Route path="/dialogs/:userId" component={DialogsItem} />
        </Switch>
    )
}

export default withAnonUserRedirect(DialogsPage)