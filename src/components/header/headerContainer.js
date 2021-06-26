import React, {Component} from 'react';
import Header from './header';
import {setAuthData} from '../../reducers/authReducer';
import {connect} from 'react-redux';
import * as axios from 'axios';

class HeaderContainer extends Component {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
            withCredentials: true
        })
        .then(response => {
            const {email, id, login} = response.data.data;
            if(response.data.resultCode === 0) {
                this.props.setAuthData(email, id, login, response.data.resultCode);
            }
        });
    }

    render() {
        return (
            <Header {...this.props} />
        )
    }
};


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login

});

const mapDispatchToProps = {
    setAuthData,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);