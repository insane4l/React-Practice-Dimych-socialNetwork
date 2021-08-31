import React from 'react';
import ProfileImages from './profileImages';
import ProfileData from './profileData';
import { ProfileType} from '../../../../../types/types';

import './profileInfo.scss';

type PropsType = {
    user: ProfileType
    isOwner: boolean
    profileStatus: string
    updateProfilePhoto: (photo: File) => void
    updateProfileStatus: (status: string) => void
    updateProfileData: (formData: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = (props) => {
    
    return (
        <div className="profile__info">
            <ProfileImages 
                isOwner={props.isOwner}
                userCover={props.user.photos.large}
                userPhoto={props.user.photos.small}
                updateProfilePhoto={props.updateProfilePhoto} />

            <ProfileData
                isOwner={props.isOwner}
                user={props.user}
                profileStatus={props.profileStatus}
                updateProfileStatus={props.updateProfileStatus}
                updateProfileData={props.updateProfileData}
                 />
        </div>
    )
};




export default ProfileInfo;