import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toggleFollowedAC, setUsersAC} from '../../../reducers/friendsPageReducer';
import * as axios from 'axios';

import './frinedsPage.scss';

class FriendsPage extends Component {
    componentDidMount() {
        if(this.props.users.length <= 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => this.props.setUsers(response.data.items));
        };
    }
    
    

    render () {
        return (
            <div className="friends__wrapper">
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
        users: state.friendsPage.users 
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        
        toggleFollowed: (userId) => {
            dispatch(toggleFollowedAC(userId));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage);