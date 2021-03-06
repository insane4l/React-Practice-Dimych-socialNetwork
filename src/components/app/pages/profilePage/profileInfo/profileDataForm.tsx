import React from 'react';
import {reduxForm, Field, InjectedFormProps} from 'redux-form';
import { ProfileType } from '../../../../../types/types';
import {CustomFieldProps, Input, Textarea} from '../../../../common/formsControls/formsControls';


let ProfileDataForm: React.FC<InjectedFormProps<ProfileDataFormValuesType,
    FormOwnPropsType> & FormOwnPropsType> 
        = React.memo( ({user, turnOffEditMode, handleSubmit, error}) => {

    return (
        <form onSubmit={handleSubmit}>
            {error && <div><b>{error}</b></div>}
            <Row title="Are you looking for a job?" inputName="lookingForAJob" type="checkbox" element="input" />
            <Row title="Your professional skills" inputName="lookingForAJobDescription" element={Textarea} />
            <Row title="Full Name" inputName="fullName" element={Input}/>
            <Row title="About Me" inputName="aboutMe" element={Textarea} />
            
            {
                Object.keys(user.contacts).map( key => {
                    return <Row key={key} title={key} inputName={"contacts." + key} element={Input} />
                })
            }
            <div className="profile__data-buttons">
                <button className="profile__data-btn" onClick={turnOffEditMode} type="button">Cancel</button>
                <button className="profile__data-btn" type="submit">Save</button>
            </div>
        </form>
    )
})


const Row: React.FC<RowPropsType> = React.memo( ({title, inputName, element, ...props}) => {
    return <div className="profile__data-row data-form__row">
                <div className="profile__data-title">{title}:</div>
                <Field 
                    name={inputName}
                    component={element}
                    className="profile__data-descr profile__data-field"
                    {...props} />
           </div>
})


const ProfileDataReduxForm = reduxForm<ProfileDataFormValuesType, FormOwnPropsType>({form: "profileData"})(ProfileDataForm)


export default ProfileDataReduxForm



type FormOwnPropsType = {
    user: ProfileType
    onSubmit: (formData: ProfileType) => void
    turnOffEditMode: () => void
}

type ProfileDataFormValuesType = ProfileType

type RowPropsType = {
    title: string
    inputName: string
    type?: string
    element?: React.FC<CustomFieldProps> | string
}