import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {login} from '../../../reducers/authReducer';
import {required, maxLengthCreator} from '../../../utils/validation/validators';
import {Input} from '../../common/formsControls/formsControls';
import {withSuccesAuthRedirect} from '../../redirectHOC/withRedirect';

import './loginPage.scss';

const maxLength25 = maxLengthCreator(25);

let LoginForm = (props) => {
    return (
        <form className="login__form" onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[required, maxLength25]} name="userEmail" component={Input} placeholder="enter user name" />
            </div>
            <div>
                <Field validate={[required, maxLength25]} name="userPass" component={Input} placeholder="enter user password" />
            </div>
            <div>
                <Field name="rememberMe" component="input" type="checkbox" /> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

LoginForm = reduxForm({form: 'login'})(LoginForm);




const LoginPage = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.userEmail, formData.userPass, formData.rememberMe);
    }

    return (
        <div className="login-page__wrapper">
            <h2 className="login-page__title">Login</h2>
            <LoginForm onSubmit={onSubmit} />
        </div>
    )
}


export default withSuccesAuthRedirect(connect(null, {login})(LoginPage));