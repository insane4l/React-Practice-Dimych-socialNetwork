import React from 'react'
import AppPage from '../../../common/appPage/AppPage'
import {withAnonUserRedirect} from '../../../HOCs/withRedirect'

import './musicPage.scss'


const MusicPage: React.FC = () => {
    return (
        <AppPage pageTitle="Music">
        
            <div>
                Music Page
            </div>
            
        </AppPage>
    )
}


export default withAnonUserRedirect(MusicPage)