import React, { useEffect, useRef } from 'react'
import PostsTimline from './postsTimeline'
import Spinner from '../../../common/spinner'
import { ProfileType } from '../../../../types/types'
import ProfileInfo from './profileInfo/profileInfo'

import './profilePage.scss'
import { AppStateType } from '../../../../reduxStore'
import { useSelector } from 'react-redux'


const ProfilePage: React.FC<PropsType> = ({isOwner, updateProfileData }) => {
    
    const topAnchor = useRef<HTMLDivElement>(null)
    const selectedProfile = useSelector( (state: AppStateType) => state.profilePage.selectedProfile)

    useEffect( () => {
        topAnchor.current?.scrollIntoView({block: 'start', behavior: 'smooth'}) // todo: need to fix (change top element)
    }, [selectedProfile])

    if (!selectedProfile) {
        return <Spinner />
    }

    return (
        <>
            <div className="page-top-anchor" ref={topAnchor}></div>
            <div className="profile__page">  
                <ProfileInfo  user={selectedProfile} isOwner={isOwner} updateProfileData={updateProfileData} />
                <PostsTimline isOwner={isOwner}/>
                <span className="section-hardcoded">Section Hardcoded</span>
            </div>
        </>
    )
}

export default ProfilePage



type PropsType = {
    isOwner: boolean
    updateProfileData: (formData: ProfileType) => Promise<any>
}