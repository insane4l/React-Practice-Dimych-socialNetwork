import React, {useState, useEffect} from 'react';

import './profilePage.scss';

const ProfileStatus = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [statusMessage, setStatus] = useState(props.profileStatus);
    
    useEffect( () => {
        setStatus(props.profileStatus)
    }, [props.profileStatus]);

    const onStatusUpdate = (e) => {
        setStatus(e.currentTarget.value)
    };

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactiveteEditMode = () => {
        setEditMode(false);
        props.updateProfileStatus(statusMessage)
    };

    const statusText = <div className="profile__status-text"
                            onDoubleClick={activateEditMode} >
                            {props.profileStatus || "......"}
                        </div>;

    const statusInput = <input className="profile__status-input"
                               value={statusMessage}
                               type="text"
                               autoFocus
                               onChange={onStatusUpdate}
                               onBlur={deactiveteEditMode} />;

    return (
        <div className="profile__status">
            {editMode ? statusInput : statusText}
        </div>
    )

}

export default ProfileStatus;