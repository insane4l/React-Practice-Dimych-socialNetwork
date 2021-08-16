import React, { useEffect } from 'react';
import { actions, followOrUnfollow, requestUsers, UsersListFiltersType } from '../../../../reducers/usersReducer';
import {UserType} from '../../../../types/types';
import Pagination from '../../../common/pagination/pagination';
import User from './user';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../../../../selectors'

import './usersPage.scss';
import UsersSearchForm from './usersSearchForm';


const UsersPage: React.FC = () => {

    const users = useSelector(selectors.getUsers)
    const totalUsersCount = useSelector(selectors.getTotalUsersCount)
    const pageSize = useSelector(selectors.getPageSize)
    const currentPage = useSelector(selectors.getCurrentPage)
    const followingInProgress = useSelector(selectors.getFollowingInProgress)
    const filters = useSelector(selectors.getUsersListFilters)

    const dispatch = useDispatch()

    useEffect(() => { //componentDidMount
        dispatch( requestUsers(pageSize, currentPage, filters) ) 
        return () => { // componentWillUnmount
            dispatch ( actions.setFilters({term: '', friend: false}) )
            dispatch ( actions.setSearchTitle('Search in All Users') )
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => { // componentDidUpdate
        dispatch( requestUsers(pageSize, 1, filters) )
        // eslint-disable-next-line
    }, [filters])
    

    const onPageSelected = (num: number) => {
        dispatch( requestUsers(pageSize, num, filters) )
    }

    const followUnfollow = (userId: number) => {
        dispatch( followOrUnfollow(userId) )
    }

    return (  
        <div className="users__wrapper">
            <UsersSearchForm />
            <Pagination 
                currentPage={currentPage}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                onPageSelected={onPageSelected} />

            <ul className="users__list">
                {   users.map( u => {
                        const btnLabel = u.followed ? 'Followed' : 'Follow';
                        return <User 
                                    key={u.id} 
                                    user={u}
                                    followingInProgress={followingInProgress}
                                    followOrUnfollow={followUnfollow}
                                    btnLabel={btnLabel} />
                    })
                }             
            </ul>
        </div>
    )
}

export default UsersPage;