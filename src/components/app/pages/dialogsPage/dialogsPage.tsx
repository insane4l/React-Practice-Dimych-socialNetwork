import React from 'react'
import DialogsList from './dialogsList/dialogsList'
import DialogsItem from './dialogsItem/dialogsItem'
import {withAnonUserRedirect} from '../../../HOCs/withRedirect'
import { Route, Switch } from 'react-router-dom'
import AppPage from '../../../common/appPage/AppPage'


const DialogsPage: React.FC = React.memo( () => {
    return (
        <AppPage pageTitle="Dialogs">
        
            <Switch >
                <Route exact path="/dialogs" component={DialogsList} />
                <Route path="/dialogs/:userId" component={DialogsItem} />
            </Switch>

        </AppPage>
    )
})

export default withAnonUserRedirect(DialogsPage)