import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toggleFollowedAC, setUsersAC, setPageNumber, setTotalUsersCount} from '../../../reducers/friendsPageReducer';
import * as axios from 'axios';

import './frinedsPage.scss';

class FriendsPage extends Component {
    
    componentDidMount() {
            const _apiBase = 'https://social-network.samuraijs.com/api/1.0';
            axios.get(`${_apiBase}/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
                
            }).then(console.log(window.store.getState()));
    }
    
    

    render () {
        
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        const pages = [];
        for(let i=1; i <= pagesCount; i++){
            pages.push(i);
        };

        return (  
            <div className="friends__wrapper">
                <div className="pagination">
                        {
                            pages.map(num => {
                                    return <span 
                                                key={num} 
                                                className={`pagination__item ${num === this.props.currentPage ? 'pagination__item_active' : ''}`}>
                                                {num}</span>
                            })
                        }
                </div>
                <ul className="friends__list">
                    {
                        this.props.users.map( u => {
                            const btnLabel = u.followed ? 'Followed' : 'Follow';
                            return (
                                <li key={u.id} className="friends__list-item">
                                    <div className="friend__image">
                                        <img src={u.photos.small} alt="friend_image" />
                                    </div>
                                    <div className="friend__info">
                                        <div className="friend__name">{u.name}</div>
                                        <div className="friend__status">{u.status}</div>
                                        <a className="friend__messages-link" href="/messages">Write message</a>
                                        <button onClick={() => this.props.toggleFollowed(u.id)}>{btnLabel}</button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage);