import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import FriendsPage from './friendsPage';
import Spinner from '../../spinner';
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

        if(!this.props.isAuth) return <Redirect to='/profile' />

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
        users: state.friendsPage.users,
        totalUsersCount: state.friendsPage.totalUsersCount,
        pageSize: state.friendsPage.pageSize,
        currentPage: state.friendsPage.currentPage,
        isLoading: state.friendsPage.isLoading,
        followingInProgress: state.friendsPage.followingInProgress,
        isAuth: state.auth.isAuth
    }
};

const mapDispatchToProps = {
    setUsers, toggleFollowed, setTotalUsersCount, setPageNumber,
    setIsLoading, setFollowingInProgress, followOrUnfollow,
    setUsersList
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsPageContainer);