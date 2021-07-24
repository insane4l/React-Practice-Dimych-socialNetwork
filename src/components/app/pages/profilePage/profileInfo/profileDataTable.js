import React from 'react';

const ProfileDataTable = (props) => {

    const contacts = Object.keys(props.user.contacts).map( key => {
        if (props.user.contacts[key]) {
            return <Row key={key} title={key} data={props.user.contacts[key]} />
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

const Row = ({title, data}) => {
    return (
        <div className="profile__data-row">
            <div className="profile__data-item">{title}:</div>
            <div className="profile__data-item">{data}</div>
        </div>
    )
};


export default ProfileDataTable;