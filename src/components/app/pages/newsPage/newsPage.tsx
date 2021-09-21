import React from 'react';
import {withAnonUserRedirect} from '../../../HOCs/withRedirect';

import './newsPage.scss';

const NewsPage: React.FC = () => {
    return (
        <div className="section">
            News Page
        </div>
    )
}

export default withAnonUserRedirect(NewsPage);