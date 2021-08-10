import React, {useState, useEffect, ChangeEvent} from 'react';


type PropsType = {
    isOwner: boolean
    profileStatus: string
    updateProfileStatus: (message: string) => void
}
const ProfileStatus: React.FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [statusMessage, setStatus] = useState(props.profileStatus);
    
    useEffect( () => {
        setStatus(props.profileStatus)
    }, [props.profileStatus]);

    const onStatusUpdate = (e: ChangeEvent<HTMLInputElement>) => {
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
                            onDoubleClick={props.isOwner ? activateEditMode : undefined}
                            title={props.isOwner ? "Double click to edit" : undefined} >
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