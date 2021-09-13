import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestNewMessagesCount } from '../../../reducers/dialogsReducer'
import { AppStateType } from '../../../reduxStore'

import './newMessagesCounter.scss'

const NewMessagesCounter: React.FC<NewMessagesCounterPropsType> = ({rerenderSecs}) => {
    const newDialogsMessagesCount = useSelector( (state: AppStateType) => state.dialogsPage.newDialogsMessagesCount)
    const isUserAuthorized = useSelector( (state: AppStateType) => state.auth.isAuthorized )
    const rerenderInterval = rerenderSecs * 1000
    const dispatch = useDispatch()
  
    useEffect( () => {
        if(isUserAuthorized) {
            dispatch( requestNewMessagesCount() )
        }
    }, [])
    
    useEffect( () => {
        let timerId: NodeJS.Timer
        if(isUserAuthorized) {
            timerId = setInterval(() => {
                dispatch( requestNewMessagesCount() )     
            }, rerenderInterval)
        }
        return () => {
            clearInterval(timerId)
        }
    }, [isUserAuthorized])


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



type NewMessagesCounterPropsType = {
    rerenderSecs: number
}