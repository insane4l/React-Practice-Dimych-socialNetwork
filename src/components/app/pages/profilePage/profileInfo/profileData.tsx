import React, {useEffect, useState} from 'react'
import ProfileStatus from './profileStatus'
import ProfileDataForm from './profileDataForm'
import ProfileDataTable from './profileDataTable'
import {ProfileType} from '../../../../../types/types'
import MessagesBtn from '../../../../common/buttons/messagesBtn/messagesBtn'
import FollowBtn from '../../../../common/buttons/followBtn/followBtn'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../../reduxStore'
import { requestFollowedUserInfo } from '../../../../../reducers/usersReducer'


const ProfileData: React.FC<ProfileDataPropsType> = ({isOwner, user, profileStatus, updateProfileStatus, updateProfileData,}) => {

    const followedUserInfo = useSelector( (state: AppStateType) => state.usersPage.followedUserInfo)
    const [editMode, setEditMode] = useState(false);
    const [dataVisibility, toggleDataVisibility] = useState(false);

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch( requestFollowedUserInfo(user.userId) )
        // eslint-disable-next-line
    }, [user])

    const onSubmit = (formData: ProfileType) => {
        // todo: remove then
        updateProfileData(formData).then( () => {
            setEditMode(false);
        })
    };

    return (
        <div className="profile__data">
            {!isOwner && 
                <div className="profile__buttons-wrapper">
                    <FollowBtn isFollowed={followedUserInfo.followedStatus} userId={followedUserInfo.userId} />
                    <MessagesBtn linkTo={`/messages`} />
                </div>
            }
            <h1 className="page__name">{user.fullName}</h1>
            <ProfileStatus 
                isOwner={isOwner} 
                profileStatus={profileStatus} 
                updateProfileStatus={updateProfileStatus} />
            <button onClick={() => toggleDataVisibility(!dataVisibility)} className="view-data__btn">
                { dataVisibility ? "Hide Profile Info" : "Show Profile Info" }
            </button>

            {dataVisibility && 
                <ProfileDataList 
                    isOwner={isOwner}
                    user={user}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    submitAction={onSubmit} />}
        </div>
    )
}


const ProfileDataList: React.FC<ProfileDataListPropsType> = ({isOwner, user, editMode, setEditMode, submitAction}) => {
    return (
        <div className="profile__data-list">
            {editMode 
                ? <ProfileDataForm
                    initialValues={user} 
                    onSubmit={submitAction} 
                    user={user} />
                : <ProfileDataTable 
                    user={user}
                    isOwner={isOwner}
                    setEditMode={() => setEditMode(true)} />
            }
        </div>
    )
}

export default ProfileData



type ProfileDataPropsType = {
    user: ProfileType
    profileStatus: string
    isOwner: boolean
    updateProfileStatus: (message: string) => void
    updateProfileData: (formData: ProfileType) => Promise<any>
}

type ProfileDataListPropsType = {
    user: ProfileType
    isOwner: boolean
    editMode: boolean
    setEditMode: (editMode: boolean) => void
    submitAction: (formData: ProfileType) => void
}