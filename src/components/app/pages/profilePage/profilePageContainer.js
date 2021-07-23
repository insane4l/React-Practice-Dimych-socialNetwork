import React, {Component} from 'react';
import {compose} from 'redux';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserProfile, getProfileStatus,
        updateProfileStatus, updateProfilePhoto,
        updateProfileData} from '../../../../reducers/profilePageReducer';
import ProfilePage from './profilePage';

class ProfilePageContainer extends Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.profileId;
        }
        if (userId) {
            this.props.getUserProfile(userId);
            this.props.getProfileStatus(userId);
        }
    }

    componentDidMount() { 
        this.refreshProfile();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {

        if (!this.props.match.params.userId && !this.props.isUserAuthorized) {
            return <Redirect to="/login" />
        }
        return (
            <ProfilePage {...this.props} isOwner={!this.props.match.params.userId}/>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.profilePage.selectedUser,
        profileStatus: state.profilePage.profileStatus,
        profileId: state.auth.id,
        isUserAuthorized: state.auth.isAuthorized
    }
};

const mapDispatchToProps = {
    getUserProfile,
    getProfileStatus,
    updateProfileStatus,
    updateProfilePhoto,
    updateProfileData
};


export default compose(
                    withRouter,
                    connect(mapStateToProps, mapDispatchToProps)
)(ProfilePageContainer);