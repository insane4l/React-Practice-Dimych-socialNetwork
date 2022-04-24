import React from 'react'
import ProfileImages from './profileImages'
import ProfileData from './profileData'
import { ProfileType} from '../../../../../types/types'

import './profileInfo.scss'


const ProfileInfo: React.FC<PropsType> = React.memo( ({user, isOwner, isUserAuthorized, updateProfileData}) => {
    
    return (
        <div className="profile__info">
            <ProfileImages 
                isOwner={isOwner}
                userCover={user.photos.large}
                userPhoto={user.photos} />

            <ProfileData
                isOwner={isOwner}
                isUserAuthorized={isUserAuthorized}
                user={user}
                updateProfileData={updateProfileData}
                 />
        </div>
    )
})


export default ProfileInfo



type PropsType = {
    user: ProfileType
    isOwner: boolean
    isUserAuthorized: boolean
    updateProfileData: (formData: ProfileType) => Promise<any>
}