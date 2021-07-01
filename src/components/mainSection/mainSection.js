import React from 'react';
import {Route} from 'react-router-dom';
import {ProfilePageContainer, FriendsPageContainer, MessagesPage, NewsPage, MusicPage, SettingsPage} from '../pages';

import './mainSection.scss';

const MainSection = () => {
    return (
        <main className="main-section">
            <div className="section">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                <Route path="/profile" component={ProfilePage} />
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                <Route path="/friends" component={FriendsPage} />
=======
                <Route path="/profile" render={() => <ProfilePage state={props.state} dispatch={props.dispatch} />} />
>>>>>>> Practice from 38 lesson dispatch(reducer), actions
=======
=======
                <Route path="/profile/:userId" component={ProfilePageContainer} />
>>>>>>> Profile page(ajax, withRouter, props.match.params). Practice from 58-60 lessons
=======
                <Route path="/profile" component={ProfilePageContainer} />
>>>>>>> mapDispatchToProps refactoring. Show author profile (when authorized + click profile page)
                <Route path="/friends" component={FriendsPageContainer} />
>>>>>>> Presentation and Container components. Practice from 56 lesson
                <Route path="/messages" component={MessagesPage} />
=======
                <Route path="/profile" render={() => <ProfilePage store={props.store} />} />
                <Route path="/messages" render={() => <MessagesPage store={props.store} />} />
>>>>>>> Presentation component and Container component without redux. Practice from 43 lesson
=======
                <Route path="/profile" component={ProfilePage} />} />
=======
                <Route path="/profile" component={ProfilePage} />
>>>>>>> React-redux Provider, connect, mapStateToProps, mapDispatchToProps. Practice from 45 lesson
                <Route path="/messages"  component={MessagesPage} />
>>>>>>> Context API: createContext, Provider, Consumer added (without react-redux), deleted props drilling. Practice from 44 lesson
=======
<<<<<<< HEAD
                <Route path="/messages"  component={MessagesPage} />
=======
                <Route path="/friends" component={FriendsPage} />
                <Route path="/messages" component={MessagesPage} />
>>>>>>> Friends page created and stylized (without links)
>>>>>>> Friends page created and stylized (without links)
=======
                <Route path="/friends" component={FriendsPage} />
                <Route path="/messages" component={MessagesPage} />
>>>>>>> Practice from 50 - 54 lessons (REST API, users API, side effect, class component, lifecycle)
                <Route path="/news" component={NewsPage} />
                <Route path="/music" component={MusicPage} />
                <Route path="/settings" component={SettingsPage} />
            </div>
        </main>
    );
}

export default MainSection;