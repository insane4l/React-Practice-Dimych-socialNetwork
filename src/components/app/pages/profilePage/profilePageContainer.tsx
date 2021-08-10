import React, {Component} from 'react';
import {compose} from 'redux';
import {withRouter, Redirect, RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserProfile, getProfileStatus} from '../../../../reducers/profilePageReducer';
import ProfilePage from './profilePage';
import { AppStateType } from '../../../../reduxStore';
import { ProfileType } from '../../../../types/types';

type MapStatePropsType = {
    user: ProfileType
    profileId: number
    isUserAuthorized: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getProfileStatus: (userId: number) => void
}

type PathParamsType = {
    userId: string | undefined
}

type PropsType = MapStatePropsType & MapDispatchPropsType & 
RouteComponentProps<PathParamsType>

class ProfilePageContainer extends Component<PropsType> {

    componentDidMount() { 
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile();
        }
    }


    refreshProfile() {
        let userId
        if (this.props.match.params.userId) {
            userId = +this.props.match.params.userId;
        }
        if(!userId) {
            userId = this.props.profileId;
        }
        if (!userId) {
            console.error("Id should exists in URI params or in state(profileId)")
        } else {
            this.props.getUserProfile(userId);
            this.props.getProfileStatus(userId);
        }
    }

    render() {
        if (!this.props.match.params.userId && !this.props.isUserAuthorized) {
            return <Redirect to="/login" />
        }

        return (
            <ProfilePage user={this.props.user} isOwner={!this.props.match.params.userId}/>
        )
    }
};


const mapStateToProps = (state: AppStateType) => {
    return {
        user: state.profilePage.selectedUser,
        profileId: state.auth.id,
        isUserAuthorized: state.auth.isAuthorized
    }
};

const mapDispatchToProps = {
    getUserProfile,
    getProfileStatus
};

export default compose<React.ComponentType>(
                    withRouter,
                    connect(mapStateToProps, mapDispatchToProps)
)(ProfilePageContainer);