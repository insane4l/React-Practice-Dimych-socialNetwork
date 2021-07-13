import React from 'react';
import PostAddFormContainer from './postAddForm/postAddFormContainer';
import PostsTimlineContainer from './postsTimeline/postsTimelineContainer';
import Spinner from '../../spinner';
import ProfileStatus from './profileStatus';

import './profilePage.scss';

window.test = [];

class ProfilePage extends React.Component {
    
    shouldComponentUpdate(nextProps, nextState) {
   
        return nextProps !== this.props || nextState !== this.state
    }
    
    render() {
        if (!this.props.user) {
            return <Spinner />
        }
        console.log("PAGE");
        console.log(this.props);
        window.test.push(this.props);
        return (
            <>  
                <div className="profile__info">
                    <div className="profile__info-images">
                        <img className="profile__info-cover" src={this.props.user.photos.large} alt="" />
                        <img className="profile__info-photo" src={this.props.user.photos.small} alt="" />
                    </div>

                    <h1 className="page__name">{this.props.user.fullName}</h1>
                    <ProfileStatus profileStatus={this.props.profileStatus} updateProfileStatus={this.props.updateProfileStatus} />

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
}

export default ProfilePage;