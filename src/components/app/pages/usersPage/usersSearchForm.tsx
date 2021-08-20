import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { UsersListFiltersType } from '../../../../reducers/usersReducer';
import { useSelector } from 'react-redux';
import * as selectors from '../../../../selectors'
import { getSearchTitleFromFilters } from '../../../../utils/utiliteFuncs';


const usersSearchFormValidators = (values: UsersListFiltersType) => {
    const errors = {};
    // if (!values.term) {
    // errors.term = 'Required';
    // }
    return errors;
}

type ReceivedValuesType = {term: string, friend: string | null | boolean}
type PropsType = {
    onFiltersChanged: (filter: UsersListFiltersType) => void
}

const UsersSearchForm: React.FC<PropsType> = (props) => {

    const stateFilters = useSelector(selectors.getUsersListFilters)

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
                            {getSearchTitleFromFilters(stateFilters.term, stateFilters.friend)}
                        </h3>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default UsersSearchForm