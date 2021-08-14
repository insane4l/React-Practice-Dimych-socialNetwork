import React, {Component} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withAnonUserRedirect} from '../../../HOCs/withRedirect'
import UsersPage from './usersPage'
import Spinner from '../../../common/spinner'
import * as selectors from '../../../../selectors/'
import {actions, followOrUnfollow, requestUsers, UsersListFiltersType} from '../../../../reducers/usersReducer'
import {AppStateType} from '../../../../reduxStore'
import {UserType} from '../../../../types/types'


type MapStatePropsType = {
    isLoading: boolean
    currentPage: number
    totalUsersCount: number
    pageSize: number
    filters: UsersListFiltersType
    users: Array<UserType>
    followingInProgress: Array<number>
    searchTitle: string
}

type MapDispatchPropsType = {
    requestUsers: (pageSize: number, pageNumber: number, filters: UsersListFiltersType) => void
    setPageNumber: (pageNumber: number) => void
    followOrUnfollow: (userId: number) => void
    setFilters: (filters: UsersListFiltersType) => void
    setSearchTitle: (title: string) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersPageContainer extends Component<PropsType> {

    componentDidMount() {
        const {requestUsers, pageSize, currentPage, filters} = this.props
        requestUsers(pageSize, currentPage, filters);
    }
    componentDidUpdate(prevProps: PropsType) {
        const {requestUsers, filters, pageSize} = this.props

        if (prevProps.filters !== filters) {
            requestUsers(pageSize, 1, filters);
        }
    }

    componentWillUnmount() {
        this.props.setFilters({term: '', friend: false})
    }

    onPageSelected = (num: number) => {
        const {requestUsers, pageSize, filters} = this.props
        requestUsers(pageSize, num, filters);
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
                            followOrUnfollow={this.props.followOrUnfollow}
                            setFilters={this.props.setFilters}
                            setSearchTitle={this.props.setSearchTitle}
                            searchTitle={this.props.searchTitle} />  
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
        followingInProgress: selectors.getFollowingInProgress(state),
        filters: selectors.getUsersListFilters(state),
        searchTitle: selectors.getUsersSearchTitle(state)
    }
}

const mapDispatchToProps = {
    setPageNumber: actions.setPageNumber,
    setFilters: actions.setFilters,
    setSearchTitle: actions.setSearchTitle,
    followOrUnfollow,
    requestUsers
}



export default compose<React.ComponentType>(
                    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps),
                    withAnonUserRedirect
               )(UsersPageContainer)