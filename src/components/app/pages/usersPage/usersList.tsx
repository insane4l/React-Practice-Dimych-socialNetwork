import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import User from './user'
import RequestError from '../../../common/errors/requestError'
import { actions } from '../../../../reducers/usersReducer'
import * as usersSelectors from '../../../../selectors/users'
import { AppStateType } from '../../../../reduxStore'


const UsersList: React.FC = () => {

    const isAuthorized = useSelector((state: AppStateType) => state.auth.isAuthorized)
    const authUserId = useSelector((state: AppStateType) => state.auth.id)

    const users = useSelector(usersSelectors.getUsers)
    const changingSubscriptionStatusError = useSelector(usersSelectors.getChangingSubscriptionStatusError)
    const dispatch = useDispatch()

    useEffect( () => {
        return () => {
            dispatch(actions.setRequestError({changingSubscriptionStatusError: null}))
        }
    }, [dispatch])

    return (
        <>
            <ul className="users__list">
                { users.map(u => <User key={u.id} user={u} isAuthorized={isAuthorized} authUserId={authUserId} />) }             
            </ul>
            {changingSubscriptionStatusError 
                && <RequestError errorMessage={changingSubscriptionStatusError} className="users__list-item_error" />}
        </>
    )
}

export default UsersList