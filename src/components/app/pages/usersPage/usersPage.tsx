import React, { useEffect } from 'react'
import { actions, requestUsers, UsersListFiltersType} from '../../../../reducers/usersReducer'
import Pagination from '../../../common/pagination/pagination'
import UsersList from './usersList'
import { useDispatch, useSelector } from 'react-redux'
import * as selectors from '../../../../selectors'
import UsersSearchForm from './usersSearchForm'
import Spinner from '../../../common/spinner'
import { withAnonUserRedirect } from '../../../HOCs/withRedirect'
import { compose } from 'redux'
import { useHistory } from 'react-router-dom'
import * as qs from 'qs'

import './usersPage.scss';


const UsersPage: React.FC = () => {

    const totalUsersCount = useSelector(selectors.getTotalUsersCount)
    const pageSize = useSelector(selectors.getPageSize)
    const currentPage = useSelector(selectors.getCurrentPage)
    const isLoading = useSelector(selectors.getLoadingStatus)
    const filters = useSelector(selectors.getUsersListFilters)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => { //componentDidMount
        const queryString = history.location.search
        console.log(queryString);
        const parsedQueryString: {page?: string, term?: string, friend?: string} = qs.parse(queryString, { ignoreQueryPrefix: true })

        console.log(parsedQueryString);
        const queryPage = Number(parsedQueryString.page) || 1
        const term = parsedQueryString.term ? parsedQueryString.term : ''
        // const friend = parsedQueryString.friend ? parsedQueryString.friend : null
        let friend
        switch(parsedQueryString.friend) {
            case 'true':
                friend = true
                break
            case 'false':
                friend = false
                break
            default:
                friend = null
        }
        dispatch( requestUsers(pageSize, queryPage, {term, friend}) ) 
        return () => { // componentWillUnmount
            dispatch ( actions.setFilters({term: '', friend: null}) )
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => { // componentDidUpdate
        pushSearchParams(currentPage, filters.term, filters.friend)
        // eslint-disable-next-line
    }, [filters, currentPage])
    

    const pushSearchParams = (P: number, T: string, F: boolean | null) => {
        const term = T ? `&term=${T}` : ''
        let friend
        switch(F) {
            case true:
            case false:
                friend = `&friend=${F}`
                break
            default:
                friend = ''
        }
        
        history.push({
            pathname: '/users', // todo: do without hardcoding
            search: `page=${P}${term}${friend}`
        })
    }

    const onPageSelected = (num: number) => {
        dispatch( requestUsers(pageSize, num, filters) )
    }

    const onFiltersChanged = (filters: UsersListFiltersType) => {
        dispatch( requestUsers(pageSize, 1, filters) )
    }

    return (  
        <div className="users__wrapper">
            <UsersSearchForm onFiltersChanged={onFiltersChanged} />
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