import React from 'react';
import {Route} from 'react-router-dom';
import {ProfilePage, FriendsPage, MessagesPage, NewsPage, MusicPage, SettingsPage} from '../pages';

import './mainSection.scss';

const MainSection = (props) => {
    debugger;
    return (
        <main className="main-section">
            <div className="section">
<<<<<<< HEAD
<<<<<<< HEAD
                <Route path="/profile" component={ProfilePage} />
                <Route path="/friends" component={FriendsPage} />
=======
                <Route path="/profile" render={() => <ProfilePage state={props.state} dispatch={props.dispatch} />} />
>>>>>>> Practice from 38 lesson dispatch(reducer), actions
                <Route path="/messages" component={MessagesPage} />
=======
                <Route path="/profile" render={() => <ProfilePage store={props.store} />} />
                <Route path="/messages" render={() => <MessagesPage store={props.store} />} />
>>>>>>> Presentation component and Container component without redux. Practice from 43 lesson
                <Route path="/news" component={NewsPage} />
                <Route path="/music" component={MusicPage} />
                <Route path="/settings" component={SettingsPage} />
            </div>
        </main>
    );
}

export default MainSection;