import React from 'react'
import NavBar from '../navBar'
import FriendsBlock from '../friendsBlock'
import AdsBlock from '../adsBlock'
import {connect} from 'react-redux'

import './sideBar.scss'
import { AppStateType } from '../../../reduxStore'
import SideBarBlock from './sideBarBlock/'

type PropsType = {
    isUserAuthorized: boolean
}
const SideBar: React.FC<PropsType> = (props) => {
    return (
        <aside className="sidebar">
            <NavBar />

            {props.isUserAuthorized && 
                <SideBarBlock blockTitle="Random Friends List">
                    <FriendsBlock friendsPerPage={10} intervalSeconds={120} />
                </SideBarBlock>
            }
            
            <SideBarBlock blockTitle="Ads">
                <AdsBlock />
            </SideBarBlock>
        </aside>
    );
}

const mapStateToProps = (state: AppStateType) => ({
    isUserAuthorized: state.auth.isAuthorized
})

export default connect(mapStateToProps)(SideBar);