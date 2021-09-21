import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import User from './user'
import * as selectors from '../../../../selectors'
import { AppStateType } from '../../../../reduxStore'
import RequestError from '../../../common/errors/requestError'
import { actions } from '../../../../reducers/usersReducer'


const UsersList: React.FC = () => {

    const users = useSelector(selectors.getUsers)
    const changingSubscriptionStatusError = useSelector( (state: AppStateType) => state.usersPage.requestErrors.changingSubscriptionStatusError)
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