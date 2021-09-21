import React, {useState, useEffect, ChangeEvent} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfileStatus } from '../../../../../reducers/profileReducer'
import { AppStateType } from '../../../../../reduxStore'
import RequestError from '../../../../common/errors/requestError'


const ProfileStatus: React.FC<PropsType> = ({isOwner}) => {

    const updateProfileStatusError = useSelector( (state: AppStateType) => state.profilePage.requestErrors.updateProfileStatusError)
    const profileStatusMessage = useSelector( (state: AppStateType) => state.profilePage.profileStatus)
    const [editMode, setEditMode] = useState(false)
    const [statusMessage, setStatus] = useState(profileStatusMessage)
    const dispatch = useDispatch()
    
    useEffect( () => {
        setStatus(profileStatusMessage)
    }, [profileStatusMessage])

    const onStatusUpdate = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactiveteEditMode = () => {
        setEditMode(false);
        dispatch( updateProfileStatus(statusMessage) )
    }
    
    const statusText = <div className="profile__status-text"
                            onDoubleClick={isOwner ? activateEditMode : undefined}
                            title={isOwner ? "Double click to edit" : undefined} >
                            {profileStatusMessage}
                        </div>

    const statusInput = <input className="profile__status-input"
                               value={statusMessage}
                               type="text"
                               autoFocus
                               onChange={onStatusUpdate}
                               onBlur={deactiveteEditMode} />

    return (
        <div className="profile__status">
            {editMode ? statusInput : statusText}
            {updateProfileStatusError && <RequestError errorMessage={updateProfileStatusError} />}
        </div>
    )

}

export default ProfileStatus



type PropsType = {
    isOwner: boolean
}