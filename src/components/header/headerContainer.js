import React, {Component} from 'react';
import Header from './header';
import {setUserAuthData} from '../../reducers/authReducer';
import {connect} from 'react-redux';

class HeaderContainer extends Component {

    componentDidMount() {
        this.props.setUserAuthData();
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
    setUserAuthData
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);