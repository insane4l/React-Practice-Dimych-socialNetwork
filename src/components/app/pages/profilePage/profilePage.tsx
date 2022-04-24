import React, { useEffect, useRef } from 'react'
import PostsTimline from './postsTimeline'
import Spinner from '../../../common/spinner'
import { ProfileType } from '../../../../types/types'
import ProfileInfo from './profileInfo/profileInfo'
import { useSelector } from 'react-redux'
import * as profileSelectors from '../../../../selectors/profile'
import AppPage from '../../../common/appPage/AppPage'

import './profilePage.scss'


const ProfilePage: React.FC<PropsType> = React.memo( ({ isOwner, isUserAuthorized, updateProfileData }) => {

    const topAnchor = useRef<HTMLDivElement>(null)
    const selectedProfile = useSelector(profileSelectors.getSelectedProfile)

    useEffect(() => {
        topAnchor.current?.scrollIntoView({ block: 'start', behavior: 'smooth' }) // todo: need to fix (change top element)
    }, [selectedProfile])

    if (!selectedProfile) {
        return <Spinner />
    }

    return (
        <AppPage pageTitle={selectedProfile.fullName}>

            <div className="page-top-anchor" ref={topAnchor}></div>
            <div className="profile__page">
                <ProfileInfo user={selectedProfile} isOwner={isOwner} isUserAuthorized={isUserAuthorized} updateProfileData={updateProfileData} />
                <PostsTimline isOwner={isOwner} />
                <span className="section-hardcoded">Section Hardcoded</span>
            </div>

        </AppPage>
    )
})

export default ProfilePage



type PropsType = {
    isOwner: boolean
    isUserAuthorized: boolean
    updateProfileData: (formData: ProfileType) => Promise<any>
}