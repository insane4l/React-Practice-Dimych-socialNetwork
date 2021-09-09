import React from 'react';
import {connect} from 'react-redux';
import ProfileInfo from './profileInfo';
import {updateProfileStatus, updateProfilePhoto,
    updateProfileData} from '../../../../../reducers/profileReducer';
import { AppStateType } from '../../../../../reduxStore';
import { ProfileType } from '../../../../../types/types';


type OwnPropsType = {
    isOwner: boolean
}

type MapStatePropsType = {
    user: ProfileType
    profileStatus: string
}
type MapDispatchPropsType = {
    updateProfileStatus: (message: string) => void
    updateProfilePhoto: (photo: File) => void
    updateProfileData: (formData: ProfileType) => Promise<any>
}

const ProfileInfoContainer: React.FC<MapStatePropsType & MapDispatchPropsType & OwnPropsType> = (props) => {
    return <ProfileInfo {...props} isOwner={props.isOwner} />
}


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        user: state.profilePage.selectedProfile,
        profileStatus: state.profilePage.profileStatus
    } as MapStatePropsType
}

const mapDispatchToProps = {
    updateProfileStatus,
    updateProfilePhoto,
    updateProfileData
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoContainer)
