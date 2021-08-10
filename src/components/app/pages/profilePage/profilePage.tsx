import React from 'react';
import ProfileInfoContainer from './profileInfo/profileInfoContainer';
import PostAddFormContainer from './postAddForm/postAddFormContainer';
import PostsTimlineContainer from './postsTimeline/postsTimelineContainer';
import Spinner from '../../../common/spinner';
import { ProfileType } from '../../../../types/types';


type PropsType = {
    user: ProfileType
    isOwner: boolean
}

const ProfilePage: React.FC<PropsType> = props => {

    if (!props.user) {
        return <Spinner />
    }

    return (
        <>  
            <ProfileInfoContainer isOwner={props.isOwner}/>
            <PostAddFormContainer />
            <PostsTimlineContainer />
        </>
    )
};

export default ProfilePage;