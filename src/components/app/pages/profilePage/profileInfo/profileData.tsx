import React, {useCallback, useState} from 'react'
import ProfileStatus from './profileStatus'
import ProfileDataForm from './profileDataForm'
import ProfileDataTable from './profileDataTable'
import {ProfileType} from '../../../../../types/types'
import MessagesBtn from '../../../../common/buttons/messagesBtn/messagesBtn'
import FollowBtn from '../../../../common/buttons/followBtn/followBtn'
import { useSelector } from 'react-redux'
import * as profileSelectors from '../../../../../selectors/profile'


const ProfileData: React.FC<ProfileDataPropsType> = React.memo( ({isOwner, user, updateProfileData, isUserAuthorized}) => {
    
    return (
        <div className="profile__data">
            { (!isOwner && isUserAuthorized) && <ProfileButtons userId={user.userId}/> }

            <h1 className="page__name">{user.fullName}</h1>

            <ProfileStatus isOwner={isOwner} />

            <ProfileDataList 
                isOwner={isOwner}
                user={user}
                updateProfileData={updateProfileData}/>
        </div>
    )
})


const ProfileButtons: React.FC<ProfileButtonsPropsType> = React.memo( ({userId}) => {

    const profileFollowedInfo = useSelector(profileSelectors.getSelectedProfileFollowedInfo)

    return (
        <div className="profile__buttons-wrapper">
            <FollowBtn isFollowed={profileFollowedInfo.followedStatus} userId={profileFollowedInfo.userId} />
            <MessagesBtn linkTo={`/dialogs/${userId}`} />
        </div>
    )
})

const ProfileDataList: React.FC<ProfileDataListPropsType> = React.memo( ({isOwner, user, updateProfileData}) => { 
    
    const [dataVisibility, setDataVisibility] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const toggleDataVisibility = useCallback( () => {
        setDataVisibility(isVisible => !isVisible)
    }, [])

    const turnOffEditMode = useCallback( () => {
        setEditMode(false)
    }, [])
    const turnOnEditMode = useCallback( () => {
        setEditMode(true)
    }, [])
    
    const onProfileDataSubmit = useCallback( (formData: ProfileType) => {
        // todo: remove then
        updateProfileData(formData).then( () => {
            setEditMode(false);
        })
    }, [updateProfileData])

    const displayedDataContent = editMode 
        ? <ProfileDataForm
            initialValues={user} 
            onSubmit={onProfileDataSubmit} 
            user={user}
            turnOffEditMode={turnOffEditMode} />
        : <ProfileDataTable 
            user={user}
            isOwner={isOwner}
            turnOnEditMode={turnOnEditMode} />
    
    return (
        <>
            <button onClick={toggleDataVisibility} className="view-data__btn">
                { dataVisibility ? "Hide Profile Info" : "Show Profile Info" }
            </button>

            {dataVisibility
                &&  <div className="profile__data-list">
                        {displayedDataContent}
                    </div> }
        </>
    )
})

export default ProfileData



type ProfileDataPropsType = {
    user: ProfileType
    isOwner: boolean
    isUserAuthorized: boolean
    updateProfileData: (formData: ProfileType) => Promise<any>
}

type ProfileButtonsPropsType = {
    userId: number
}

type ProfileDataListPropsType = {
    user: ProfileType
    isOwner: boolean
    updateProfileData: (formData: ProfileType) => Promise<any>
}