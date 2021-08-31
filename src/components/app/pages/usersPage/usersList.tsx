import React from 'react'
import { useSelector } from 'react-redux'
import User from './user'
import * as selectors from '../../../../selectors'


const UsersList: React.FC = () => {

    const users = useSelector(selectors.getUsers)
    return (
        <ul className="users__list">
            { users.map(u => <User key={u.id} user={u} />) }             
        </ul>
    )
}

export default UsersList