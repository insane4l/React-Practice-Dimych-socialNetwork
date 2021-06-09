import React from 'react';
import PostAddForm from './postAddForm';
import PostsTimline from './postsTimeline';

import coverImg from './coverImg.jpeg';
import profilePhoto from './profilePhoto.jpg';
import './profilePage.scss';

const ProfilePage = (props) => {
    return (
        <>  
            
            <div className="profile__info">
                <div className="profile__info-images">
                    <img className="profile__info-cover" src={coverImg} alt="" />
                    <img className="profile__info-photo" src={profilePhoto} alt="" />
                </div>

                <h1 className="page__name">Roman Karpeyev</h1>

                <button className="view-data__btn">View Profile Info</button>

                {/* <div className="profile__data-block">
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
                </div> */}
            </div>

            

            <PostAddForm store={props.store} state={props.store.getState()} />

            <PostsTimline store={props.store} state={props.store.getState()} />
            

        </>
    )
}

export default ProfilePage