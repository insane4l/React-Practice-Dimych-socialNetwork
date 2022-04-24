import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { UsersListFiltersType } from '../../../../reducers/usersReducer'
import { useSelector } from 'react-redux'
import * as usersSelectors from '../../../../selectors/users'
import { AppStateType } from '../../../../reduxStore'


const usersSearchFormValidators = (values: UsersListFiltersType) => {
    const errors = {};
    // if (!values.term) {
    // errors.term = 'Required';
    // }
    return errors;
}


const UsersSearchForm: React.FC<PropsType> = React.memo( (props) => {

    const isAuthorized = useSelector((state: AppStateType) => state.auth.isAuthorized)
    const stateFilters = useSelector(usersSelectors.getUsersListFilters)

    const onFormSubmit = (values: ReceivedValuesType, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void} ) => {
        // filters constructing
        const filter = {
            term: values.term,
            friend: values.friend === 'Friends Only' ? true : values.friend === 'Not Friends' ? false : null
        }
        
        props.onFiltersChanged(filter)
        setSubmitting(false) // (fake disable) todo: reed docs, how to sync formik setSubmitting with the response from the server
    }

    const friendInputValue = stateFilters.friend === false ? "Not Friends" : stateFilters.friend === true ? "Friends Only" : null
    
    return (
        <Formik
            initialValues={{term: stateFilters.term, friend: friendInputValue as boolean | null}}
            enableReinitialize
            validate={usersSearchFormValidators}
            onSubmit={onFormSubmit}
        >
            {({isSubmitting}) => {

                return (
                    <Form className="users__search-form">
                        <div className="search__field-wrapper">
                            <Field className="users__search-field" type="search" name="term" />
                            <button className="users__search-btn" type="submit" disabled={isSubmitting}>
                                Search
                            </button>
                        </div>
                        
                        <ErrorMessage className="users__search-error" name="term" component="div" />

                        {isAuthorized 
                            && <>
                                <label className="users__search-label">
                                    <Field type="radio" name="friend" value="Not Friends" />
                                    Not friends
                                </label>
                                <label className="users__search-label">
                                    <Field type="radio" name="friend" value="Friends Only" />
                                    Friends
                                </label>

                                <h3 className="users__search-title">
                                    {props.searchTitle}
                                </h3>
                            </>
                        }
                    </Form>
                )
            }}
        </Formik>
    )
})

export default UsersSearchForm



type ReceivedValuesType = {term: string, friend: string | null | boolean}

type PropsType = {
    onFiltersChanged: (filter: UsersListFiltersType) => void
    currentPage: number
    pagesCount: number
    searchTitle: string
}