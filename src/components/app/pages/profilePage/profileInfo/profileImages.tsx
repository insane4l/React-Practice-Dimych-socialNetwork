import React, { ChangeEvent } from 'react';

import {defaultCover, defaultPhoto} from '../../../../../assets/images';
import {addNewImage} from '../../../../../assets/icons';


type PropsType = {
    isOwner: boolean
    userCover: string | null
    userPhoto: string | null
    updateProfilePhoto: (photo: File) => void
}

const ProfileImages: React.FC<PropsType> = ({isOwner, userCover, userPhoto, updateProfilePhoto}) => {

    const onNewPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length) {
            updateProfilePhoto(e.target.files[0]);
        }
    };

    return (
        <div className="profile__info-images">
            <img className="profile__info-cover" src={userCover || defaultCover} alt="" />
            <div className="user-photo__wrapper">
                <div className="profile__info-photo" >
                    <img src={userPhoto || defaultPhoto} alt="user_photo" />
                </div>
                {isOwner 
                    && <div className="change-photo">
                            <input id="change-photo_input" onChange={onNewPhotoSelected} type="file" />
                            <label className="change-photo_label" htmlFor="change-photo_input">
                                <img className="change-photo_icon" src={addNewImage} alt="new_photo" />
                            </label>
                        </div>
                }
            </div>  
        </div>
    )
}

export default ProfileImages;