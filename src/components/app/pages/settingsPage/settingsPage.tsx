import React from 'react';
import './settingsPage.scss';
import {withAnonUserRedirect} from '../../../HOCs/withRedirect';

const SettingsPage = () => {
    return (
        <div className="section">
            Settings Page
        </div>
    )
}

export default withAnonUserRedirect(SettingsPage);