import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {Input} from '../../../../common/formsControls/formsControls';

let ProfileDataForm = ({user, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {error && <div><b>{error}</b></div>}
            <Row title="Are you looking for a job?" inputName="lookingForAJob" type="checkbox" component="input" />
            <Row title="Your professional skills" inputName="lookingForAJobDescription" component="Textarea" />
            <Row title="Full Name" inputName="fullName" />
            <Row title="About Me" inputName="aboutMe" component="Textarea" />
            
            {
                Object.keys(user.contacts).map( key => {
                    return <Row key={key} title={key} inputName={"contacts." + key} />
                })
            }
            <button>Save data</button>
        </form>
    )
}


const Row = ({title, inputName, ...props}) => {
    return <div className="profile__data-row data-form__row">
                <div className="profile__data-item">{title}:</div>
                <Field 
                    name={inputName}
                    component={Input}
                    className="profile__data-item profile__data-field"
                    {...props} />
           </div>
}

ProfileDataForm = reduxForm({form: "profileData"})(ProfileDataForm);


export default ProfileDataForm;