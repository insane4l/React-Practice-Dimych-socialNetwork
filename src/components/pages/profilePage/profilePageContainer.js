import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import usersAPI from '../../../services/usersAPI';
import {setUserAction} from '../../../reducers/profilePageReducer';
import ProfilePage from './profilePage';

class ProfilePageContainer extends Component {
    componentDidMount() { 
      
        usersAPI.getUserAuthData().then(response => {
                    //not working
                    const authId = response.data.data.id;
                    const anotherUserId = this.props.match.params.userId;
                    const userId = anotherUserId ? anotherUserId : authId;
                    console.log(response.data.data.id);
                    console.log(this.props.match.params.userId);
                    console.log(userId);

                    usersAPI.getUserProfile(userId).then(response => {
                        this.props.setUserAction(response.data);
                    });
        })
        
        
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