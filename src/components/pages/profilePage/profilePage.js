import React from 'react';
import PostAddFormContainer from './postAddForm/postAddFormContainer';
import PostsTimlineContainer from './postsTimeline/postsTimelineContainer';
import Spinner from '../../spinner';
import ProfileStatus from './profileStatus';

import './profilePage.scss';

const ProfilePage = props => {
    
    if (!props.user) {
        return <Spinner />
    }
    return (
        <>  
            <div className="profile__info">
                <div className="profile__info-images">
                    <img className="profile__info-cover" src={props.user.photos.large} alt="" />
                    <img className="profile__info-photo" src={props.user.photos.small} alt="" />
                </div>

                <h1 className="page__name">{props.user.fullName}</h1>
                <ProfileStatus profileStatus={props.profileStatus} updateProfileStatus={props.updateProfileStatus} />

                <button className="view-data__btn">View Profile Info</button>

                <div className="profile__data-block">
                    <div className="profile__data-row">
                        <div className="profile__data-item birth__label">Birthday:</div>
                        <div className="profile__data-item birth__value">24 january</div>
                    </div>
                    <div className="profile__data-row">
                        <div className="profile__data-item location__label">Current city:</div>
                        <div className="profile__data-item location__value">Narva</div>
                    </div>
                    <div className="profile__data-row">
                        <div className="profile__data-item education__label">Education:</div>
                        <div className="profile__data-item education__value">Narva Kutseoppekeskus</div>
                    </div>
                    <div className="profile__data-row">
                        <div className="profile__data-item website__label">Website:</div>
                        <div className="profile__data-item website__value">https://karpeyev.ru</div>
                    </div>
                </div>
            </div>

            

            <PostAddFormContainer />

            <PostsTimlineContainer />
            

        </>
    )
}

export default ProfilePage;