import React, { ChangeEvent, useState } from 'react';

import {defaultCover, defaultPhoto} from '../../../../../assets/images';
import * as icons from '../../../../../assets/icons';
import FullSizeImage from '../../../../common/imagesPresentation/fullSizeImage';
import { UserPhotosType } from '../../../../../types/types';


type PropsType = {
    isOwner: boolean
    userCover: string | null
    userPhoto: UserPhotosType
    updateProfilePhoto: (photo: File) => void
}

const ProfileImages: React.FC<PropsType> = ({isOwner, userCover, userPhoto, updateProfilePhoto}) => {

    const [displayFSImage, setFSImageDisplay] = useState(false)

    const zoomInPhoto = () => {
        if (userPhoto.large) {
            setFSImageDisplay(true)
        }
    }

    const onNewPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length) {
            updateProfilePhoto(e.target.files[0]);
        }
    };

    return (
        <div className="profile__info-images">
            <img className="profile__info-cover" src={userCover || defaultCover} alt="" />
            <div className="avatar__wrapper">
                <div className="profile__info-avatar" >
                    <img 
                        onClick={zoomInPhoto}
                        className="profile__info-photo"
                        src={userPhoto.small || defaultPhoto}
                        alt="user_photo" />
                    {displayFSImage && userPhoto.large 
                        && <FullSizeImage source={userPhoto.large} closeHandler={() => setFSImageDisplay(false)}/>}
                </div>
                {isOwner 
                    && <div className="change-photo">
                            <input id="change-photo_input" onChange={onNewPhotoSelected} type="file" />
                            <label className="change-photo_label" htmlFor="change-photo_input">
                                <img className="change-photo_icon" src={icons.addNewImage} alt="new_photo" />
                            </label>
                        </div>
                }
            </div>  
        </div>
    )
}

export default ProfileImages;