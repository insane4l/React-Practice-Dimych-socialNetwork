import React from 'react'
import {withAnonUserRedirect} from '../../../HOCs/withRedirect'
import AppPage from '../../../common/appPage/AppPage'

import './settingsPage.scss'


const SettingsPage = React.memo( () => {
    return (
        <AppPage pageTitle="Settings">

            <div className="section">
                Settings Page
            </div>
            
        </AppPage>
    )
})

export default withAnonUserRedirect(SettingsPage)