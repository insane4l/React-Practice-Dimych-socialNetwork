import React from 'react';
import {reduxForm, InjectedFormProps} from 'redux-form';
import {connect} from 'react-redux';
import {login} from '../../../../reducers/authReducer';
import {required, maxLengthCreator} from '../../../../utils/validation/validators';
import {createField, Input} from '../../../common/formsControls/formsControls';
import {withSuccesAuthRedirect} from '../../../HOCs/withRedirect';
import {compose} from 'redux';
import { AppStateType } from '../../../../reduxStore';

import './loginPage.scss';

const maxLength25 = maxLengthCreator(25);


type FormOwnPropsType = {
    captchaUrl: string | null
}

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

let LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, FormOwnPropsType> & FormOwnPropsType> = (props) => {
    return (
        <form className="login__form" onSubmit={props.handleSubmit}>
            <div>
                {createField<LoginFormValuesTypeKeys>("email", Input, [required, maxLength25], "enter user name", {className: "login__input-email"})}
                {/* <Field validate={[required, maxLength25]} name="userEmail" component={Input} placeholder="enter user name" /> */}
            </div>
            <div>
                {createField<LoginFormValuesTypeKeys>("password", Input, [required, maxLength25], "enter user password", {type: "password", className: "login__input-password"})}
                {/* <Field validate={[required, maxLength25]} name="userPass" component={Input} type="password" placeholder="enter user password" /> */}
            </div>
            <div>
                {createField<LoginFormValuesTypeKeys>("rememberMe", "input", [], undefined, {type: "checkbox", id: "login__checkbox"})}
                {/* <Field name="rememberMe" component="input" type="checkbox" /> remember me */}
                <label className="login__input-checkbox" htmlFor="login__checkbox">Remember me</label>
            </div>
            {
                props.captchaUrl && 
                <div>
                    {createField<LoginFormValuesTypeKeys>("captcha", Input, [required], "enter symbols from image", {className: "login__input-captcha"})}
                    {/* <Field name="captcha" component={Input} validate={[required]} placeholder="enter symbols from image" /> */}
                    <img className="login__input-captcha-img" src={props.captchaUrl} alt="captcha" />
                </div>
            }
            {
                props.error && <div className="submit-error">{props.error}</div>
            }
            
            <button className="login__form-btn">Log in</button>
            
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, FormOwnPropsType>({form: 'login'})(LoginForm);



type MapStatePropsType = {
    captchaUrl: string | null
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}



const LoginPage: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    return (
        <div className="login-page__wrapper">
            <h2 className="login-page__title">Login</h2>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType  => {
    return {
        captchaUrl: state.auth.captchaUrl
    }
}

export default compose<React.ComponentType>(withSuccesAuthRedirect,
                       connect(mapStateToProps, {login})
                       )
                       (LoginPage);