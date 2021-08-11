import React from 'react';
import {NavLink} from 'react-router-dom';

import './pageNotFound.scss';

const PageNotFound: React.FC = () => {
    return (
        <div className="error__page-wrapper">
            <h2 className="error__page-title">404 ERROR</h2>
            <div className="error__page-descr">Page not found</div>
            <NavLink className="error__page-link" to="/profile">Go back to the main page</NavLink>
        </div>
    )
}

export default PageNotFound;