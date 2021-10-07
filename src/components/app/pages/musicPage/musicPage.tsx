import React from 'react'
import {withAnonUserRedirect} from '../../../HOCs/withRedirect'

import './musicPage.scss'


const MusicPage: React.FC = () => {
    return (
        <div className="section">
            Music Page
        </div>
    )
}


export default withAnonUserRedirect(MusicPage)