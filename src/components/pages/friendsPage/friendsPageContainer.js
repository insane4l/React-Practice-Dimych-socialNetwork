import React, {Component} from 'react';
import {connect} from 'react-redux';
import usersAPI from '../../../services/usersAPI';
import FriendsPage from './friendsPage';
import Spinner from '../../spinner';
import {toggleFollowedAC, setUsersAC, setPageNumber, setTotalUsersCount, setIsLoading} from '../../../reducers/friendsPageReducer';



class FriendsPageContainer extends Component {

    componentDidMount() {
        this.props.setIsLoading(true);
        usersAPI.getUsers(this.props.pageSize, this.props.currentPage)
            .then(response => {
                this.props.setIsLoading(false); 
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageSelected = (num) => {
        this.props.setIsLoading(true);
        this.props.setPageNumber(num);
        usersAPI.getUsers(this.props.pageSize, num)
                .then(response => {
                    this.props.setIsLoading(false);
                    this.props.setUsers(response.data.items);
                });
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
                            toggleFollowed={this.props.toggleFollowed}/>
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
        isLoading: state.friendsPage.isLoading 
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        
        toggleFollowed: (userId) => {
            dispatch(toggleFollowedAC(userId));
        },
        setTotalUsersCount: (count) => {
            dispatch(setTotalUsersCount(count));
        },
        setPageNumber: (num) => {
            dispatch(setPageNumber(num));
        },
        setIsLoading: (loading) => {
            dispatch(setIsLoading(loading));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(FriendsPageContainer);