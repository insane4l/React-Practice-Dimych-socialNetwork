import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestNewMessagesCount } from '../../../reducers/dialogsReducer'
import { AppStateType } from '../../../reduxStore'

import './newMessagesCounter.scss'

const NewMessagesCounter: React.FC<NewMessagesCounterPropsType> = ({rerenderSecs}) => {
    const newMessagesCountRequestError = useSelector( (state: AppStateType) => state.dialogsPage.requestErrors.newMessagesCountRequestError)
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


    //if new messages <= 0 and not request error: nothing is shown
    if (newDialogsMessagesCount <= 0 && !newMessagesCountRequestError) return <span></span>
    //if request error(no actual new messages count): display error 
    //else display new messages count
    return (
        <span 
            className="new-messages-counter navbar__new-messages-counter"
            title={`${newMessagesCountRequestError || newDialogsMessagesCount} new messages`}>
                {newMessagesCountRequestError || newDialogsMessagesCount}
        </span> 
    )
}

export default NewMessagesCounter



type NewMessagesCounterPropsType = {
    rerenderSecs: number
}