import React, {useState} from 'react';
import ProfileStatus from './profileStatus';
import ProfileDataForm from './profileDataForm';
import ProfileDataTable from './profileDataTable';

const ProfileData = ({isOwner, user, profileStatus, updateProfileStatus, updateProfileData,}) => {

    const [editMode, setEditMode] = useState(false);
    const [dataVisibility, toggleDataVisibility] = useState(false);

    const onSubmit = (formData) => {
        updateProfileData(formData).then( () => {
            setEditMode(false);
        })
    };

    return (
        <div className="profile__data">
            <h1 className="page__name">{user.fullName}</h1>
            <ProfileStatus 
                isOwner={isOwner} 
                profileStatus={profileStatus} 
                updateProfileStatus={updateProfileStatus} />
            <button onClick={() => toggleDataVisibility(!dataVisibility)} className="view-data__btn">
                { dataVisibility ? "Hide Profile Info" : "Show Profile Info" }
            </button>

            {dataVisibility && 
                <ProfileDataList 
                    isOwner={isOwner}
                    user={user}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    onSubmit={onSubmit} />}
        </div>
    )
};

const ProfileDataList = ({isOwner, user, editMode, setEditMode, onSubmit}) => {
    return (
        <div className="profile__data-list">
            {editMode 
                ? <ProfileDataForm
                    initialValues={user} 
                    onSubmit={onSubmit} 
                    user={user} />
                : <ProfileDataTable 
                    user={user}
                    isOwner={isOwner}
                    setEditMode={() => setEditMode(true)} />
            }
        </div>
    )
};

export default ProfileData;