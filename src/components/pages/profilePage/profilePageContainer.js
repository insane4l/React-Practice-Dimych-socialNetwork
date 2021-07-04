import React, {Component} from 'react';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserProfile, getProfileStatus, updateProfileStatus} from '../../../reducers/profilePageReducer';
import ProfilePage from './profilePage';

class ProfilePageContainer extends Component {
    componentDidMount() { 
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 17964;
            console.warn('need a fix (with out hard coding) need fetch auth/me and get authorized user id')
        }
        this.props.getUserProfile(userId);
        this.props.getProfileStatus(userId);
    }

    render() {
        return (
            <ProfilePage {...this.props} />
        )
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.profilePage.selectedUser,
        profileStatus: state.profilePage.profileStatus
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