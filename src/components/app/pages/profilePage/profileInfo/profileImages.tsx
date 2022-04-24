import React, { ChangeEvent, useState } from 'react'
import { UserPhotosType } from '../../../../../types/types'
import { useDispatch } from 'react-redux'
import { updateProfilePhoto } from '../../../../../reducers/profileReducer'
import FullSizeImage from '../../../../common/imagesPresentation/fullSizeImage'

import {defaultCover, defaultPhoto} from '../../../../../assets/images'
import * as icons from '../../../../../assets/icons'


const ProfileImages: React.FC<PropsType> = React.memo( ({isOwner, userCover, userPhoto}) => {

    const [displayFSImage, setFSImageDisplay] = useState(false)
    const dispatch = useDispatch()

    const zoomInPhoto = () => {
        if (userPhoto.large) {
            setFSImageDisplay(true)
        }
    }

    const onNewPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length) {
            dispatch( updateProfilePhoto(e.target.files[0]) )
        }
    }

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
})

export default ProfileImages



type PropsType = {
    isOwner: boolean
    userCover: string | null
    userPhoto: UserPhotosType
}
