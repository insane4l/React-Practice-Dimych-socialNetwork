import React from 'react';
import NavBar from '../navBar';
import FriendsBlock from '../friendsBlock';
import AdsBlock from '../adsBlock';
import {connect} from 'react-redux';

import './sideBar.scss';
import { AppStateType } from '../../../reduxStore';

type PropsType = {
    isUserAuthorized: boolean
}
const SideBar: React.FC<PropsType> = (props) => {
    return (
        <aside className="sidebar">
            <NavBar />
            {props.isUserAuthorized && <FriendsBlock />}
            <AdsBlock />
        </aside>
    );
}

const mapStateToProps = (state: AppStateType) => ({
    isUserAuthorized: state.auth.isAuthorized
})

export default connect(mapStateToProps)(SideBar);