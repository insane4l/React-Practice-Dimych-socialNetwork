import React from 'react';
import {Route} from 'react-router-dom';
import {ProfilePage, MessagesPage, NewsPage, MusicPage, SettingsPage} from '../pages';

import './mainSection.scss';

const MainSection = (props) => {
    return (
        <main className="main-section">
            <div className="section">
                <Route path="/profile" render={() => <ProfilePage state={props.state} dispatch={props.dispatch} />} />
                <Route path="/messages" render={() => <MessagesPage state={props.state} dispatch={props.dispatch} />} />
                <Route path="/news" component={NewsPage} />
                <Route path="/music" component={MusicPage} />
                <Route path="/settings" component={SettingsPage} />
            </div>
        </main>
    );
}

export default MainSection;