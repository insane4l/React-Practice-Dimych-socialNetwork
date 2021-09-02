import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Spinner from '../../common/spinner';
import {ProfilePageContainer, DialogsPage, NewsPage, MusicPage, SettingsPage, LoginPage, PageNotFound} from '../pages';

import './mainSection.scss';

const UsersPage = React.lazy(() => import('../pages/usersPage/usersPage'));
const ChatPage = React.lazy(() => import('../pages/chatPage/chatPage'));
// todo: React lazy does not cause splitting bundle in chunks
// try this https://stackoverflow.com/questions/53186595/react-lazy-does-not-cause-splitting-bundle-in-chunks


const MainSection: React.FC = () => {
    return (
        <main className="main-section">
            <div className="section">
            <React.Suspense fallback={Spinner}>
                <Switch>
                    <Redirect exact from="/" to="/profile" />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/profile/:userId?" component={ProfilePageContainer} />
                    <Route path="/users" component={UsersPage} />
                    <Route path="/dialogs" component={DialogsPage} />
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