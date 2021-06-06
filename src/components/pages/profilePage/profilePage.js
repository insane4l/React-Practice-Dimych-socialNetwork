import React from 'react';

import coverImg from './coverImg.jpeg';
import profilePhoto from './profilePhoto.jpg';
import './profilePage.scss';

const ProfilePage = () => {
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

            <div className="profile__posts">
                <div className="profile__posts-title">Posts</div>

                <form action="" className="post-add__form">
                    <input type="text" className="post-add__input" />
                    <button className="button post-add__btn">Send</button>
                </form>

                <div className="profile__posts-timeline">
                    <div className="profile__posts-item">
                        My second post
                    </div>
                    <div className="profile__posts-item">
                        My first post
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage