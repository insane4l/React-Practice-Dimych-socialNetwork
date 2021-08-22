import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Spinner from '../../common/spinner';
import {ProfilePageContainer, MessagesPage, NewsPage, MusicPage, SettingsPage, LoginPage, PageNotFound} from '../pages';

import './mainSection.scss';

const UsersPage = React.lazy(() => import('../pages/usersPage/usersPage'));
const ChatPage = React.lazy(() => import('../pages/chatPage/chatPage'));


const MainSection: React.FC = () => {
    return (
        <main className="main-section">
            <div className="section">
            <React.Suspense fallback={Spinner}>
                <Switch>
                    <Redirect exact from="/" to="/profile" />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/profile/:userId?" component={ProfilePageContainer} />
                    <Route path="/users" render={() => (
                        <React.Suspense fallback={Spinner}><UsersPage /></React.Suspense>
                    )} />
                    <Route path="/messages" component={MessagesPage} />
                    <Route path="/news" component={NewsPage} />
                    <Route path="/music" component={MusicPage} />
                    <Route path="/chat" component={ChatPage} />
                    <Route path="/settings" component={SettingsPage} />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </React.Suspense>
            </div>
        </main>
    );
}

export default MainSection;