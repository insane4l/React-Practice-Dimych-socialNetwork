import React from 'react';
import NavBar from '../navBar';
import FriendsBlock from '../friendsBlock';
import AdsBlock from '../adsBlock';

import './sideBar.scss';

const SideBar = () => {
    return (
        <aside className="sidebar">
            <NavBar />
            <FriendsBlock />
            <AdsBlock />
        </aside>
    );
}

export default SideBar;