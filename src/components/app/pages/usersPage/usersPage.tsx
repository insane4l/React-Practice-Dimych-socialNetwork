import React from 'react';
import { UsersListFiltersType } from '../../../../reducers/usersReducer';
import {UserType} from '../../../../types/types';
import Pagination from '../../../common/pagination/pagination';
import User from './user';

import './usersPage.scss';
import UsersSearchForm from './usersSearchForm';

type PropsType = {
    users: Array<UserType>
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageSelected: (pageNumber: number) => void
    followingInProgress: Array<number>
    followOrUnfollow: (userId: number) => void
    setFilters: (filters: UsersListFiltersType) => void
    setSearchTitle: (title: string) => void
    searchTitle: string
}

const UsersPage: React.FC<PropsType> = (props) => {
    
    return (  
        <div className="users__wrapper">
            <UsersSearchForm 
                setFilters={props.setFilters}
                setSearchTitle={props.setSearchTitle}
                searchTitle={props.searchTitle} />
            <Pagination 
                currentPage={props.currentPage}
                totalItemsCount={props.totalUsersCount}
                pageSize={props.pageSize}
                onPageSelected={props.onPageSelected} />

            <ul className="users__list">
                {   props.users.map( u => {
                        const btnLabel = u.followed ? 'Followed' : 'Follow';
                        return <User 
                                    key={u.id} 
                                    user={u}
                                    followingInProgress={props.followingInProgress}
                                    followOrUnfollow={props.followOrUnfollow}
                                    btnLabel={btnLabel} />
                    })
                }             
            </ul>
        </div>
    )
}

export default UsersPage;