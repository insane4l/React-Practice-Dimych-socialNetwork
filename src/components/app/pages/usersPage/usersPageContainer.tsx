import React from 'react'
import {compose} from 'redux'
import {useSelector} from 'react-redux'
import {withAnonUserRedirect} from '../../../HOCs/withRedirect'
import UsersPage from './usersPage'
import Spinner from '../../../common/spinner'
import * as selectors from '../../../../selectors/'


const UsersPageContainer = () => {

    const isLoading = useSelector(selectors.getLoadingStatus)

    return (
        <>
            {isLoading ? <Spinner/> : null}
            <UsersPage />  
        </>
    )
}


export default compose<React.ComponentType>(
                    withAnonUserRedirect
               )(UsersPageContainer)