import React from 'react';
import NavBar from '../navBar';
import AdsBlock from '../adsBlock';

import './sideBar.scss';

const SideBar = () => {
    return (
        <aside className="sidebar">
            <NavBar />
            <AdsBlock />
        </aside>
    );
}

export default SideBar;