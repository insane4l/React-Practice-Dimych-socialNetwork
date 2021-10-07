import React from 'react'
import { ProfileContactsType, ProfileType } from '../../../../../types/types'


const ProfileDataTable: React.FC<PropsType> = (props) => {

    const {isOwner, setEditMode, user: {contacts, aboutMe, lookingForAJob, lookingForAJobDescription}} = props

    const contactsList = Object.keys(contacts).map( key => {
        if (contacts[key as keyof ProfileContactsType]) {
            return <Row key={key} title={key} data={contacts[key as keyof ProfileContactsType]} isLink />
        }
        return null;
    })

    return (
        <>  
            {aboutMe && <Row title="About me" data={aboutMe} />}
            {lookingForAJobDescription && <Row title="My skills" data={lookingForAJobDescription} />}
            {lookingForAJob && <div className="profile__data-descr">Looking for a job!</div>}
            {contactsList}
            {isOwner && <button className="profile__data-btn" onClick={setEditMode} >Change data</button>}
        </>
    )
}


const Row: React.FC<RowPropsType> = ({title, data, isLink}) => {
    let link = `http://${data}`
    if (data && /^http/im.test(data)) {
        link = data
    }
    return (
        <div className="profile__data-row">
            <div className="profile__data-title">{title}:</div>
            {isLink 
                ? <a className="profile__data-link" target="_blank" rel="noreferrer" href={link}>{data}</a>
                : <div className="profile__data-descr">{data}</div>}
        </div>
    )
}


export default ProfileDataTable



type PropsType = {
    isOwner: boolean
    user: ProfileType
    setEditMode: () => void
}

type RowPropsType = {
    title: string
    data: string | undefined
    isLink?: boolean
}