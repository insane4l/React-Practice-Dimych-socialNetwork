import React, {useState} from 'react';
import PostAddFormContainer from './postAddForm/postAddFormContainer';
import PostsTimlineContainer from './postsTimeline/postsTimelineContainer';
import Spinner from '../../../common/spinner';
import ProfileStatus from './profileStatus';
import ProfileDataForm from './profileDataForm';

import defaultCover from '../../../../assets/images/defaultCover.jpeg';
import defaultPhoto from '../../../../assets/images/defaultPhoto.png';
import './profilePage.scss';

const ProfilePage = props => {
    
    const [editMode, setEditMode] = useState(false);
    const [showProfile, viewProfileData] = useState(false);
    
    if (!props.user) {
        return <Spinner />
    }

    const onSubmit = (formData) => {
        props.updateProfileData(formData).then( () => {
            setEditMode(false);
        })
        
    }

    const onNewPhotoSelected = (e) => {
        if(e.target.files.length) {
            props.updateProfilePhoto(e.target.files[0]);
        }
    }


    return (
        <>  
            <div className="profile__info">
                <div className="profile__info-images">
                    <img className="profile__info-cover" src={props.user.photos.large || defaultCover} alt="" />
                    <img className="profile__info-photo" src={props.user.photos.small || defaultPhoto} alt="" />
                    {props.isOwner && <input onChange={onNewPhotoSelected} type="file" /> }
                </div>

                <h1 className="page__name">{props.user.fullName}</h1>
                <ProfileStatus profileStatus={props.profileStatus} updateProfileStatus={props.updateProfileStatus} />

                {!editMode && 
                    <button onClick={() => viewProfileData(!showProfile)} className="view-data__btn">View Profile Info</button>}

                {showProfile && <div className="profile__data-block">
                    

                    {editMode 
                        ? <ProfileDataForm initialValues={props.user} onSubmit={onSubmit} user={props.user} />
                        : <ProfileData user={props.user}
                                       isOwner={props.isOwner}
                                       setEditMode={() => setEditMode(true)} />
                    }


                    
                </div>}
            </div>

            

            <PostAddFormContainer />

            <PostsTimlineContainer />
            

        </>
    )
}

const ProfileData = (props) => {

    const contacts = Object.keys(props.user.contacts).map( key => {
        if (props.user.contacts[key]) {
            return <Contact key={key} service={key} link={props.user.contacts[key]} />
        }
        return null;
    })

    return (
        <>
            <div className="profile__data-row">
                <div className="profile__data-item">About me:</div>
                <div className="profile__data-item">{props.user.aboutMe}</div>
            </div>
            <div className="profile__data-row">
                <div className="profile__data-item birth__label">Looking for a job</div>
                <div className="profile__data-item birth__value">{props.user.lookingForAJobDescription}</div>
            </div>

            
            {contacts}

            {props.isOwner && <button onClick={props.setEditMode} >Change data</button>}

        </>
    )
}

const Contact = ({service, link}) => {
    return (
        <div className="profile__data-row">
            <div className="profile__data-item birth__label">{service}:</div>
            <div className="profile__data-item birth__value">{link}</div>
        </div>
    )
}

export default ProfilePage;