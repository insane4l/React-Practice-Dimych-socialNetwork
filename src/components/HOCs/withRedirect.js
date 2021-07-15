import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuthorized
    }
};

// export const withAnonUserRedirect = (Component) => {
//     const RedirectComponent = (props) => {
//         if(!props.isAuth) return <Redirect to='/login' />;
//         return <Component {...props}/>;
//     }
//     const ConnectedRedirect = connect(mapStateToProps)(RedirectComponent);
//     return ConnectedRedirect;
// };

const redirectHOC = (afterLoggingIn = false) => (Component) => {
    const RedirectComponent = (props) => {
        
        if(!props.isAuth && !afterLoggingIn) return <Redirect to={'/login'} />;
        if(props.isAuth && afterLoggingIn) return <Redirect to={'/profile'} />;
        return <Component {...props}/>;
    }
    const ConnectedRedirect = connect(mapStateToProps)(RedirectComponent);
    return ConnectedRedirect;
};

export const withAnonUserRedirect = redirectHOC();
export const withSuccesAuthRedirect =  redirectHOC(true);