import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as axios from 'axios';
import FriendsPage from './friendsPage';
import {toggleFollowedAC, setUsersAC, setPageNumber, setTotalUsersCount} from '../../../reducers/friendsPageReducer';



class FriendsPageContainer extends Component {

    componentDidMount() {
        const _apiBase = 'https://social-network.samuraijs.com/api/1.0';
        axios.get(`${_apiBase}/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
        .then(response => {
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);   
        });
    }

    onPageSelected = (num) => {
        this.props.setPageNumber(num);
        const _apiBase = 'https://social-network.samuraijs.com/api/1.0';
            axios.get(`${_apiBase}/users?count=${this.props.pageSize}&page=${num}`)
            .then(response => {
                this.props.setUsers(response.data.items); 
            });
    }

    render () {
        return <FriendsPage 
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageSelected={this.onPageSelected}
                    users={this.props.users}
                    toggleFollowed={this.props.toggleFollowed}/>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.friendsPage.users,
        totalUsersCount: state.friendsPage.totalUsersCount,
        pageSize: state.friendsPage.pageSize,
        currentPage: state.friendsPage.currentPage 
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
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(FriendsPageContainer);