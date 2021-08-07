import React, {Component} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withAnonUserRedirect} from '../../../HOCs/withRedirect'
import UsersPage from './usersPage'
import Spinner from '../../../common/spinner'
import * as selectors from '../../../../selectors/'
import {actions, followOrUnfollow, setUsersList} from '../../../../reducers/usersPageReducer'
import {AppStateType} from '../../../../reduxStore'
import {UserType} from '../../../../types/types'


type MapStatePropsType = {
    isLoading: boolean
    currentPage: number
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    setUsersList: (pageSize: number, pageNumber: number) => void
    setPageNumber: (pageNumber: number) => void
    followOrUnfollow: (userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersPageContainer extends Component<PropsType> {

    componentDidMount() {
        this.props.setUsersList(this.props.pageSize, this.props.currentPage);
    }

    onPageSelected = (num: number) => {
        this.props.setPageNumber(num);
        this.props.setUsersList(this.props.pageSize, num);
    }

    render () {
        return (
            <>
                {this.props.isLoading ? <Spinner/> : null}
                <UsersPage 
                            totalUsersCount={this.props.totalUsersCount}
                            pageSize={this.props.pageSize}
                            currentPage={this.props.currentPage}
                            onPageSelected={this.onPageSelected}
                            users={this.props.users}
                            followingInProgress={this.props.followingInProgress}
                            followOrUnfollow={this.props.followOrUnfollow} />  
            </>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: selectors.getUsers(state),
        totalUsersCount: selectors.getTotalUsersCount(state),
        pageSize: selectors.getPageSize(state),
        currentPage: selectors.getCurrentPage(state),
        isLoading: selectors.getLoadingStatus(state),
        followingInProgress: selectors.getFollowingInProgress(state)
    }
}

const mapDispatchToProps = {
    setPageNumber: actions.setPageNumber,
    followOrUnfollow,
    setUsersList
}



export default compose(
                    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps),
                    withAnonUserRedirect
               )(UsersPageContainer)