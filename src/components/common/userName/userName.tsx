import React from 'react'
import {Link} from 'react-router-dom'


const UserName: React.FC<UserNamePropsType> = React.memo( ({linkTo, userName, className}) => {
    return (
        <Link className={className} to={linkTo} >
            <div className="user__component-name">
                {userName}
            </div>
        </Link>
    )
})

export default UserName



type UserNamePropsType = {
    linkTo: string
    userName: string | undefined
    className: string
}