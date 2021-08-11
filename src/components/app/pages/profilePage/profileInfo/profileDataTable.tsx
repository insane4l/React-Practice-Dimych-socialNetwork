import React from 'react';
import { ProfileContactsType, ProfileType } from '../../../../../types/types';

type PropsType = {
    isOwner: boolean
    user: ProfileType
    setEditMode: () => void
}

const ProfileDataTable: React.FC<PropsType> = (props) => {

    const {isOwner, setEditMode, user: {contacts, aboutMe, lookingForAJobDescription}} = props

    const contactsList = Object.keys(contacts).map( key => {
        if (contacts[key as keyof ProfileContactsType]) {
            return <Row key={key} title={key} data={contacts[key as keyof ProfileContactsType]} />
        }
        return null;
    })

    return (
        <>
            {aboutMe && <Row title="About me" data={aboutMe} />}
            {lookingForAJobDescription && <Row title="My skills" data={lookingForAJobDescription} />}
            {contactsList}
            {isOwner && <button onClick={setEditMode} >Change data</button>}
        </>
    )
};


type RowPropsType = {
    title: string
    data: string | null
}
const Row: React.FC<RowPropsType> = ({title, data}) => {
    return (
        <div className="profile__data-row">
            <div className="profile__data-item">{title}:</div>
            <div className="profile__data-item">{data}</div>
        </div>
    )
};


export default ProfileDataTable;