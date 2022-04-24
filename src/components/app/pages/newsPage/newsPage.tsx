import React from 'react'
import AppPage from '../../../common/appPage/AppPage'
import {withAnonUserRedirect} from '../../../HOCs/withRedirect'

import './newsPage.scss'


const NewsPage: React.FC = React.memo( () => {
    return (
        <AppPage pageTitle="News">

            <div>
                News Page
            </div>

        </AppPage>
    )
})

export default withAnonUserRedirect(NewsPage)