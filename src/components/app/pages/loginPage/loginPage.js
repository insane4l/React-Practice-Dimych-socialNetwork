import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {login} from '../../../../reducers/authReducer';
import {required, maxLengthCreator} from '../../../../utils/validation/validators';
import {Input} from '../../../common/formsControls/formsControls';
import {withSuccesAuthRedirect} from '../../../HOCs/withRedirect';
import {compose} from 'redux';

import './loginPage.scss';

const maxLength25 = maxLengthCreator(25);

let LoginForm = (props) => {
    return (
        <form className="login__form" onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[required, maxLength25]} name="userEmail" component={Input} placeholder="enter user name" />
            </div>
            <div>
                <Field validate={[required, maxLength25]} name="userPass" component={Input} type="password" placeholder="enter user password" />
            </div>
            <div>
                <Field name="rememberMe" component="input" type="checkbox" /> remember me
            </div>
            {
                props.captchaUrl && 
                <div>
                    <Field name="captcha" component={Input} validate={[required]} placeholder="enter symbols from image" />
                    <img src={props.captchaUrl} alt="captcha" />
                </div>
            }
            {
                props.error && <div className="submit-error">{props.error}</div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

LoginForm = reduxForm({form: 'login'})(LoginForm);




const LoginPage = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.userEmail, formData.userPass, formData.rememberMe, formData.captcha);
    }

    return (
        <div className="login-page__wrapper">
            <h2 className="login-page__title">Login</h2>
            <LoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        captchaUrl: state.auth.captchaUrl
    }
}

export default compose(withSuccesAuthRedirect,
                       connect(mapStateToProps, {login})
                       )
                       (LoginPage);