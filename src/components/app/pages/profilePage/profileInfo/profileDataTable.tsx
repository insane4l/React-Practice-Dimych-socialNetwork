import React from 'react';
import { ProfileContactsType, ProfileType } from '../../../../../types/types';

type PropsType = {
    isOwner: boolean
    user: ProfileType
    setEditMode: () => void
}

const ProfileDataTable: React.FC<PropsType> = (props) => {

    const contacts = Object.keys(props.user.contacts).map( key => {
        if (props.user.contacts[key as keyof ProfileContactsType]) {
            return <Row key={key} title={key} data={props.user.contacts[key as keyof ProfileContactsType]} />
        }
        return null;
    })

    return (
        <>
            <Row title="About me" data={props.user.aboutMe} />
            <Row title="My skills" data={props.user.lookingForAJobDescription} />
            {contacts}
            {props.isOwner && <button onClick={props.setEditMode} >Change data</button>}
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