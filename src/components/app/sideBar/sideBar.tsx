import React from 'react'
import NavBar from '../navBar'
import FriendsBlock from '../friendsBlock'
import AdsBlock from '../adsBlock'
import {connect} from 'react-redux'
import { AppStateType } from '../../../reduxStore'
import SideBarBlock from './sideBarBlock/'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import './sideBar.scss'


const SideBar: React.FC<PropsType> = (props) => {

    const isSmallerThanLgBreakPoint = useMediaQuery({ query: `(max-width: 992px)`})

    if (isSmallerThanLgBreakPoint) return <span className="hidden-stub"></span>
    return (
        <aside className="sidebar">
            <NavBar />

            {props.isUserAuthorized && 
                <SideBarBlock blockTitle={<Link to="/users?friend=true">Friends</Link>}>
                    <FriendsBlock friendsPerPage={9} intervalSeconds={300} />
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

export default connect(mapStateToProps)(SideBar)



type PropsType = {
    isUserAuthorized: boolean
}