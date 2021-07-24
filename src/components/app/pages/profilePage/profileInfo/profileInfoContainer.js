import React from 'react';
import {connect} from 'react-redux';
import ProfileInfo from './profileInfo';
import {updateProfileStatus, updateProfilePhoto,
    updateProfileData} from '../../../../../reducers/profilePageReducer';

const ProfileInfoContainer = (props) => {
    return <ProfileInfo {...props} isOwner={props.isOwner} />
};


const mapStateToProps = (state) => {
    return {
        user: state.profilePage.selectedUser,
        profileStatus: state.profilePage.profileStatus
    }
};

const mapDispatchToProps = {
    updateProfileStatus,
    updateProfilePhoto,
    updateProfileData
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoContainer);