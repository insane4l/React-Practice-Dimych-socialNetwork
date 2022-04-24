import React, { useEffect } from 'react'
import { actions, requestUsers, UsersListFiltersType} from '../../../../reducers/usersReducer'
import Pagination from '../../../common/pagination/pagination'
import UsersList from './usersList'
import { useDispatch, useSelector } from 'react-redux'
import * as usersSelectors from '../../../../selectors/users'
import UsersSearchForm from './usersSearchForm'
import Spinner from '../../../common/spinner'
import { useHistory } from 'react-router-dom'
import * as qs from 'qs'
import RequestError from '../../../common/errors/requestError'
import { getSearchTitleFromSetParameters } from '../../../../utils/transformFuncs'
import AppPage from '../../../common/appPage/AppPage'

import './usersPage.scss'


const UsersPage: React.FC = () => {

    const totalUsersCount = useSelector(usersSelectors.getTotalUsersCount)
    const pageSize = useSelector(usersSelectors.getPageSize)
    const currentPage = useSelector(usersSelectors.getCurrentPage)
    const isLoading = useSelector(usersSelectors.getLoadingStatus)
    const usersRequestError = useSelector(usersSelectors.getUsersRequestError)
    const filters = useSelector(usersSelectors.getUsersListFilters)

    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    const searchTitle = getSearchTitleFromSetParameters (filters.term, filters.friend,
    currentPage, pagesCount)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => { //componentDidMount
        const queryString = history.location.search
        const parsedQS: {page?: string, term?: string, friend?: string} = qs.parse(queryString, { ignoreQueryPrefix: true })
 
        const queryPage = Number(parsedQS.page) || 1
        const term = parsedQS.term ? parsedQS.term : ''
        
        let friend
        switch(parsedQS.friend) {
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
    }, []) // todo: need to fix (when users page opened and then url search params changed, component already mounted - synchronization is not performed)

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
        <AppPage pageTitle={searchTitle}>
            
            <div className="users__wrapper">
                <UsersSearchForm 
                    onFiltersChanged={onFiltersChanged}
                    currentPage={currentPage}
                    pagesCount={pagesCount}
                    searchTitle={searchTitle} />
                <Pagination 
                    currentPage={currentPage}
                    totalItemsCount={totalUsersCount}
                    pageSize={pageSize}
                    onPageSelected={onPageSelected} />
                {isLoading ? <Spinner/> : <UsersList />}   
                {usersRequestError && <RequestError errorMessage={usersRequestError} /> }
            </div>

        </AppPage> 
    )
}

export default UsersPage