import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import User from './user'
import RequestError from '../../../common/errors/requestError'
import { actions } from '../../../../reducers/usersReducer'
import * as usersSelectors from '../../../../selectors/users'


const UsersList: React.FC = () => {

    const users = useSelector(usersSelectors.getUsers)
    const changingSubscriptionStatusError = useSelector(usersSelectors.getChangingSubscriptionStatusError)
    const dispatch = useDispatch()

    useEffect( () => {
        return () => {
            dispatch(actions.setRequestError({changingSubscriptionStatusError: null}))
        }
    }, [])

    return (
        <>
            <ul className="users__list">
                { users.map(u => <User key={u.id} user={u} />) }             
            </ul>
            {changingSubscriptionStatusError 
                && <RequestError errorMessage={changingSubscriptionStatusError} className="users__list-item_error" />}
        </>
    )
}

export default UsersList