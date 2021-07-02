import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setUserProfile} from '../../../reducers/profilePageReducer';
import ProfilePage from './profilePage';

class ProfilePageContainer extends Component {
    componentDidMount() { 
        this.props.setUserProfile(this.props.match.params.userId);
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
    setUserProfile
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer));