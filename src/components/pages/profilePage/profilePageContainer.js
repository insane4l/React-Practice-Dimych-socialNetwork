import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as axios from 'axios';
import {setUserAction} from '../../../reducers/profilePageReducer';
import ProfilePage from './profilePage';

class ProfilePageContainer extends Component {
    componentDidMount() {
        const userId = this.props.match.params.userId;
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
             .then(response => {
                 this.props.setUserAction(response.data);
             });
    }

    render() {
        return (
            <ProfilePage {...this.props} user={this.props.user}/>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.profilePage.selectedUser
    }
};

const mapDispatchToProps = {
    setUserAction
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer));