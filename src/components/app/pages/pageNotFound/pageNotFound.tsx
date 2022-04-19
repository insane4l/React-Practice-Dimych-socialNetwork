import React from 'react'
import {NavLink} from 'react-router-dom'
import AppPage from '../../../common/appPage/AppPage'

import './pageNotFound.scss'


const PageNotFound: React.FC = () => {
    return (
        <AppPage pageTitle="404 Page Not Found">
        
            <div className="error__page-wrapper">
                <h2 className="error__page-title">404 ERROR</h2>
                <div className="error__page-descr">Page not found</div>
                <NavLink className="error__page-link" to="/profile">Go back to the main page</NavLink>
            </div>
            
        </AppPage>
    )
}

export default PageNotFound