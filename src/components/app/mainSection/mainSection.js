import React from 'react';
import {Route} from 'react-router-dom';
import Spinner from '../../common/spinner';
import {ProfilePageContainer, MessagesPage, NewsPage, MusicPage, SettingsPage, LoginPage} from '../pages';

import './mainSection.scss';

const UsersPageContainer = React.lazy(() => import('../pages/usersPage/usersPageContainer'));


const MainSection = () => {
    return (
        <main className="main-section">
            <div className="section">
            <React.Suspense fallback={Spinner}>
                <Route path="/login" component={LoginPage} />
                <Route path="/profile/:userId?" component={ProfilePageContainer} />
                <Route path="/users" component={UsersPageContainer} />
                <Route path="/messages" component={MessagesPage} />
                <Route path="/news" component={NewsPage} />
                <Route path="/music" component={MusicPage} />
                <Route path="/settings" component={SettingsPage} />
            </React.Suspense>
            </div>
        </main>
    );
}

export default MainSection;