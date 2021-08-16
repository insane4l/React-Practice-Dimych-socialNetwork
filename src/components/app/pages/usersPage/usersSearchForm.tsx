import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { actions, UsersListFiltersType } from '../../../../reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../../../../selectors'


const usersSearchFormValidators = (values: UsersListFiltersType) => {
    const errors = {};
    // if (!values.term) {
    // errors.term = 'Required';
    // }
    return errors;
}

type ReceivedValuesType = {term: string, friend: string | null | boolean}

const UsersSearchForm: React.FC = (props) => {

    const searchTitle = useSelector(selectors.getUsersSearchTitle)
    const dispatch = useDispatch()

    const submit = (values: ReceivedValuesType, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void} ) => {
        
        const filter = {
            term: values.term,
            friend: values.friend === 'Friends Only' ? true : values.friend === 'Not Friends' ? false : null
        }
        dispatch( actions.setFilters(filter) )

        const friendsFilterTitle = values.friend ? values.friend : 'All Users'
        const termFilterTitle = values.term ? `"${values.term}"` : ''
        const title = `Search ${termFilterTitle} in ${friendsFilterTitle}`
        dispatch( actions.setSearchTitle(title) )

        setSubmitting(false) // (fake disable) todo: reed docs, how to sync with the response from the server
    }

    return (
        <Formik
            initialValues={{term: '', friend: null}}
            validate={usersSearchFormValidators}
            onSubmit={submit}
        >
            {({isSubmitting}) => {

                return (
                    <Form className="users__search-form">
                        <Field type="search" name="term" />
                        <ErrorMessage name="term" component="div" />
                        <label>
                            <Field type="radio" name="friend" value="Not Friends" />
                            Not friends
                        </label>
                        <label>
                            <Field type="radio" name="friend" value="Friends Only" />
                            Friends
                        </label>
                        <button className="users__search-btn" type="submit" disabled={isSubmitting}>
                            Search
                        </button>
                        <h3>
                            {searchTitle}
                        </h3>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default UsersSearchForm