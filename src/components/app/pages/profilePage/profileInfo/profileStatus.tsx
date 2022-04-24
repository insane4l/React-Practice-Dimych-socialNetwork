import React, {useState, useEffect, ChangeEvent} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, updateProfileStatus } from '../../../../../reducers/profileReducer'
import RequestError from '../../../../common/errors/requestError'
import * as profileSelectors from '../../../../../selectors/profile'


const ProfileStatus: React.FC<PropsType> = React.memo( ({isOwner}) => {

    const updateProfileStatusError = useSelector(profileSelectors.getUpdateProfileStatusError)
    const profileStatusMessage = useSelector(profileSelectors.getProfileStatus)
    const [editMode, setEditMode] = useState(false)
    const [statusMessage, setStatus] = useState(profileStatusMessage)
    const dispatch = useDispatch()
    
    useEffect( () => {
        setStatus(profileStatusMessage)
    }, [profileStatusMessage])
    
    useEffect( () => {
        return () => {
            dispatch( actions.setUpdateProfileStatusError(null) ) //error cleanup
        }
    }, [])

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

})

export default ProfileStatus



type PropsType = {
    isOwner: boolean
}