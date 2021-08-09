import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { AppStateType } from '../../reduxStore';

const mapStateToProps = (state: AppStateType) => ({
        isAuth: state.auth.isAuthorized
} as MapPropsType);

type MapPropsType = {
    isAuth: boolean
}




const redirectHOC = function<WCP>(afterLoggingIn = false) { 
    return (WrappedComponent: React.ComponentType<WCP>) => { // Wrapped Component Props
        const RedirectComponent: React.FC<MapPropsType> = (props) => {
            const {isAuth, ...restProps} = props

            if(!isAuth && !afterLoggingIn) return <Redirect to={'/login'} />;
            if(isAuth && afterLoggingIn) return <Redirect to={'/profile'} />;
            return <WrappedComponent {...restProps as WCP}/>;
        }
       
        return connect(mapStateToProps)(RedirectComponent)
    }
};


export const withAnonUserRedirect = redirectHOC();
export const withSuccesAuthRedirect =  redirectHOC(true);