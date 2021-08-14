import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { UsersListFiltersType } from '../../../../reducers/usersReducer';



const usersSearchFormValidators = (values: UsersListFiltersType) => {
    const errors = {};
    // if (!values.term) {
    // errors.term = 'Required';
    // }
    return errors;
}

type OwnPropsType = {
    setFilters: (filters: UsersListFiltersType) => void
    setSearchTitle: (title: string) => void
    searchTitle: string
}

type ReceivedValuesType = {term: string, friend: string | null | boolean}

const UsersSearchForm: React.FC<OwnPropsType> = (props) => {

    const submit = (values: ReceivedValuesType, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void} ) => {
        
        const filter = {
            term: values.term,
            friend: values.friend === 'Friends Only' ? true : values.friend === 'Not Friends' ? false : null
        }
        props.setFilters(filter)

        const friendsFilterTitle = values.friend ? values.friend : 'All Users'
        const termFilterTitle = values.term ? `"${values.term}"` : ''
        const title = `Search ${termFilterTitle} in ${friendsFilterTitle}`
        props.setSearchTitle(title)

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
                            {props.searchTitle}
                        </h3>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default UsersSearchForm