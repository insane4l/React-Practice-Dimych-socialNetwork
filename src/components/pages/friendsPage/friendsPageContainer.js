import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withAnonUserRedirect} from '../../HOCs/withRedirect';
import FriendsPage from './friendsPage';
import Spinner from '../../spinner';
import * as selectors from '../../../selectors/';
import {toggleFollowed, setUsers, setPageNumber, setTotalUsersCount, setIsLoading,
        setFollowingInProgress, followOrUnfollow, setUsersList} from '../../../reducers/friendsPageReducer';



class FriendsPageContainer extends Component {

    componentDidMount() {
        this.props.setUsersList(this.props.pageSize, this.props.currentPage);
    }

    onPageSelected = (num) => {
        this.props.setPageNumber(num);
        this.props.setUsersList(this.props.pageSize, num);
    }

    render () {

        return (
            <>
                {this.props.isLoading ? <Spinner/> : null}
                <FriendsPage 
                            totalUsersCount={this.props.totalUsersCount}
                            pageSize={this.props.pageSize}
                            currentPage={this.props.currentPage}
                            onPageSelected={this.onPageSelected}
                            users={this.props.users}
                            followingInProgress={this.props.followingInProgress}
                            setFollowingInProgress={this.props.setFollowingInProgress}
                            followOrUnfollow={this.props.followOrUnfollow} />  
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: selectors.getUsers(state),
        totalUsersCount: selectors.getTotalUsersCount(state),
        pageSize: selectors.getPageSize(state),
        currentPage: selectors.getCurrentPage(state),
        isLoading: selectors.getLoadingStatus(state),
        followingInProgress: selectors.getFollowingInProgress(state)
    }
};

const mapDispatchToProps = {
    setUsers, toggleFollowed, setTotalUsersCount, setPageNumber,
    setIsLoading, setFollowingInProgress, followOrUnfollow,
    setUsersList
};

export default compose(
                    connect(mapStateToProps, mapDispatchToProps),
                    withAnonUserRedirect
               )(FriendsPageContainer);