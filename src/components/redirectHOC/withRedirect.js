import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
};

const withAuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if(!props.isAuth) return <Redirect to='/login' />;
        return <Component {...props}/>;
    }
    const ConnectedRedirect = connect(mapStateToProps)(RedirectComponent);
    return ConnectedRedirect;

};

export default withAuthRedirect;