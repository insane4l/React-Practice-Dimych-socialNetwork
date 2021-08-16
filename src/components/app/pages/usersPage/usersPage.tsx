import React, { useEffect } from 'react';
import { actions, requestUsers} from '../../../../reducers/usersReducer';
import Pagination from '../../../common/pagination/pagination';
import UsersList from './usersList';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../../../../selectors'

import './usersPage.scss';
import UsersSearchForm from './usersSearchForm';
import Spinner from '../../../common/spinner';
import { withAnonUserRedirect } from '../../../HOCs/withRedirect';
import { compose } from 'redux';


const UsersPage: React.FC = () => {

    const totalUsersCount = useSelector(selectors.getTotalUsersCount)
    const pageSize = useSelector(selectors.getPageSize)
    const currentPage = useSelector(selectors.getCurrentPage)
    const isLoading = useSelector(selectors.getLoadingStatus)
    
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

    return (  
        <div className="users__wrapper">
            <UsersSearchForm />
            <Pagination 
                currentPage={currentPage}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                onPageSelected={onPageSelected} />
            {isLoading ? <Spinner/> : <UsersList />}   
            
        </div>
    )
}

export default compose<React.ComponentType>(
    withAnonUserRedirect
)(UsersPage)