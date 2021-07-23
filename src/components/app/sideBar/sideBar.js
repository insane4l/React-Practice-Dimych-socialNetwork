import React from 'react';
import NavBar from '../navBar';
import FriendsBlock from '../friendsBlock';
import AdsBlock from '../adsBlock';
import {connect} from 'react-redux';

import './sideBar.scss';


const SideBar = (props) => {
    return (
        <aside className="sidebar">
            <NavBar />
            {props.isUserAuthorized && <FriendsBlock />}
            <AdsBlock />
        </aside>
    );
}

const mapStateToProps = (state) => ({
    isUserAuthorized: state.auth.isAuthorized
})

export default connect(mapStateToProps)(SideBar);