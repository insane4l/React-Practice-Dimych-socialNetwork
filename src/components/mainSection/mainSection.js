import React from 'react';
import {Route} from 'react-router-dom';
import {ProfilePage, MessagesPage, NewsPage, MusicPage, SettingsPage} from '../pages';

import './mainSection.scss';

const MainSection = () => {
    return (
        <main className="main-section">
            <div className="section">
                <Route path="/profile" component={ProfilePage} />
                <Route path="/messages" component={MessagesPage} />
                <Route path="/news" component={NewsPage} />
                <Route path="/music" component={MusicPage} />
                <Route path="/settings" component={SettingsPage} />
            </div>
        </main>
    );
}

export default MainSection;