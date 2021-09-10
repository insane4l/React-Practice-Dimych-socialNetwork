import React, { useEffect, useRef } from 'react'
import ProfileInfoContainer from './profileInfo/profileInfoContainer'
import PostsTimline from './postsTimeline'
import Spinner from '../../../common/spinner'
import { ProfileType } from '../../../../types/types'

import './profilePage.scss'
import PostAddForm from './postAddForm'


type PropsType = {
    user: ProfileType
    isOwner: boolean
}

const ProfilePage: React.FC<PropsType> = props => {
    
    const topAnchor = useRef<HTMLDivElement>(null)

    useEffect( () => {
        topAnchor.current?.scrollIntoView({block: 'start', behavior: 'smooth'}) // todo: need to fix (change top element)
    }, [props.user])

    if (!props.user) {
        return <Spinner />
    }

    return (
        <>
            <div className="page-top-anchor" ref={topAnchor}></div>
            <div className="profile__page">  
                <ProfileInfoContainer  isOwner={props.isOwner}/>
                {props.isOwner && <PostAddForm />}
                <PostsTimline />
                <span className="section-hardcoded">Section Hardcoded</span>
            </div>
        </>
    )
}

export default ProfilePage