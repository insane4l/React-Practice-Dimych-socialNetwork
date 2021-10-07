import React, {Component} from 'react'
import {compose} from 'redux'
import {withRouter, Redirect, RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUserProfile, getProfileStatus, actions, requestProfileFollowedInfo, updateProfileData} from '../../../../reducers/profileReducer'
import ProfilePage from './profilePage'
import { AppStateType } from '../../../../reduxStore'
import { ProfileType, UserType } from '../../../../types/types'
import Spinner from '../../../common/spinner'


class ProfilePageContainer extends Component<PropsType> {

    componentDidMount() { 
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile()
        }
    }

    componentWillUnmount() {
        this.props.setUserProfile(null)
    }

    refreshProfile() {
        let userId
        if (this.props.match.params.userId) {
            userId = +this.props.match.params.userId
        }
        if(!userId) {
            userId = this.props.authUserId
        }
        if (!userId) {
            console.error("Id should exists in URI params or in state(authUserId)")
        } else {
            this.props.getUserProfile(userId)
            this.props.getProfileStatus(userId)
            this.props.requestProfileFollowedInfo(userId)
        }
    }

    render() {
        if (!this.props.match.params.userId && !this.props.isUserAuthorized) {
            return <Redirect to="/login" />
        }

        if (this.props.isLoading) return <Spinner />

        return (
            <ProfilePage 
                isOwner={!this.props.match.params.userId || +this.props.match.params.userId === this.props.authUserId}
                updateProfileData={this.props.updateProfileData} />
        )
    }
}


const mapStateToProps = (state: AppStateType) => {
    return {
        isUserAuthorized: state.auth.isAuthorized,
        isLoading: state.profilePage.isLoading,
        authUserId: state.auth.id
    }
}

const mapDispatchToProps = {
    getUserProfile,
    getProfileStatus,
    requestProfileFollowedInfo,
    updateProfileData,
    setUserProfile: actions.profileReceived
}


export default compose<React.ComponentType>(
                    withRouter,
                    connect(mapStateToProps, mapDispatchToProps)
)(ProfilePageContainer)



type MapStatePropsType = {
    isUserAuthorized: boolean
    isLoading: boolean
    authUserId: number
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getProfileStatus: (userId: number) => void
    requestProfileFollowedInfo: (userId: number) => void
    setUserProfile: (user: UserType | null) => void
    updateProfileData: (formData: ProfileType) => Promise<any>
}

type PathParamsType = {
    userId: string | undefined
}

type PropsType = MapStatePropsType & MapDispatchPropsType & 
RouteComponentProps<PathParamsType>