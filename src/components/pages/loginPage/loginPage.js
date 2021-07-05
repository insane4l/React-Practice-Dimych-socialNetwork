import React from 'react';
import {reduxForm, Field} from 'redux-form';

import './loginPage.scss';



let LoginForm = (props) => {
    return (
        <form className="login__form" onSubmit={props.handleSubmit}>
            <div>
                <Field name="userName" component="input" placeholder="enter user name" />
            </div>
            <div>
                <Field name="userPass" component="input" placeholder="enter user password" />
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




const LoginPage = () => {

    const onSubmit = (formData) => {
        console.log(formData);
    }

    return (
        <div className="login-page__wrapper">
            <h2 className="login-page__title">Login</h2>
            <LoginForm onSubmit={onSubmit} />
        </div>
    )
}

export default LoginPage;