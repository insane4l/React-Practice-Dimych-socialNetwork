import React, {Component} from 'react';
import {compose} from 'redux';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserProfile, getProfileStatus, updateProfileStatus} from '../../../reducers/profilePageReducer';
import ProfilePage from './profilePage';
import { withAnonUserRedirect } from '../../redirectHOC/withRedirect';

class ProfilePageContainer extends Component {
    componentDidMount() { 
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.profileId;
        }
        if (userId) {
            this.props.getUserProfile(userId);
            this.props.getProfileStatus(userId);
        }
    }

    // getActualId() {
    //     let userId = this.props.match.params.userId;
    //     if(!userId) {
    //         userId = this.props.profileId;
    //     }
    //     return userId;
    // }
    render() {

        if (!this.props.match.params.userId && !this.props.isUserAuthorized) {
            return <Redirect to="/login" />
        }
        return (
            <ProfilePage {...this.props} />
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
    updateProfileStatus
};


export default compose(
                    withRouter,
                    connect(mapStateToProps, mapDispatchToProps)
)(ProfilePageContainer);