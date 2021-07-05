import React from 'react';
import {Route} from 'react-router-dom';
import {ProfilePageContainer, FriendsPageContainer, MessagesPage, NewsPage, MusicPage, SettingsPage, LoginPage} from '../pages';

import './mainSection.scss';

const MainSection = () => {
    return (
        <main className="main-section">
            <div className="section">
                <Route path="/login" component={LoginPage} />
                <Route path="/profile/:userId?" component={ProfilePageContainer} />
                <Route path="/friends" component={FriendsPageContainer} />
                <Route path="/messages" component={MessagesPage} />
                <Route path="/news" component={NewsPage} />
                <Route path="/music" component={MusicPage} />
                <Route path="/settings" component={SettingsPage} />
            </div>
        </main>
    );
}

export default MainSection;