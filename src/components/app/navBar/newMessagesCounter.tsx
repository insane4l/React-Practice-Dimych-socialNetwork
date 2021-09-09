import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestNewMessagesCount } from '../../../reducers/dialogsReducer'
import { AppStateType } from '../../../reduxStore'

import './newMessagesCounter.scss'

const NewMessagesCounter = () => {
    const newDialogsMessagesCount = useSelector( (state: AppStateType) => state.dialogsPage.newDialogsMessagesCount)
    const dispatch = useDispatch()
  
    useEffect( () => {
        dispatch( requestNewMessagesCount() )
    }, [])
    
    useEffect( () => {
        let timerId = setInterval(() => {
            dispatch( requestNewMessagesCount() )     
        }, 90000)
        return () => {
            clearInterval(timerId)
        }
    }, [])


    if (newDialogsMessagesCount <= 0 ) return <span></span>
    return (
        <span 
            className="new-messages-counter navbar__new-messages-counter"
            title={`${newDialogsMessagesCount} new messages`}>
                {newDialogsMessagesCount}
        </span> 
    )
}

export default NewMessagesCounter