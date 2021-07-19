import React from 'react';
import {reduxForm, Field} from 'redux-form';
import { Input } from '../../common/formsControls/formsControls';

let ProfileDataForm = ({user, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {error && <div><b>{error}</b></div>}
            <div className="profile__data-row">
                <div className="profile__data-item">Are you looking for a job?</div>
                <Field name="lookingForAJob" component="input" type="checkbox" className="profile__data-item"></Field>
            </div>
            <div className="profile__data-row">
                <div className="profile__data-item birth__label">Your professional skills:</div>
                <Field name="lookingForAJobDescription" component={Input} className="profile__data-item birth__value"></Field>
            </div>
            <div className="profile__data-row">
                <div className="profile__data-item birth__label">Full Name:</div>
                <Field name="fullName" component={Input} className="profile__data-item birth__value"></Field>
            </div>
            <div className="profile__data-row">
                <div className="profile__data-item birth__label">About Me:</div>
                <Field name="aboutMe" component={Input} className="profile__data-item birth__value"></Field>
            </div>
            {
                Object.keys(user.contacts).map( key => {
                    return <ContactField key={key} service={key} link={user.contacts[key]} />
                })
            }
            <button>Save data</button>
        </form>
    )
}

const ContactField = ({service, link}) => {
    return <div className="profile__data-row">
                <div className="profile__data-item birth__label">{service}:</div>
                <Field name={"contacts." + service} component={Input} className="profile__data-item birth__value"></Field>
           </div>
}

ProfileDataForm = reduxForm({form: "profileData"})(ProfileDataForm);


export default ProfileDataForm;