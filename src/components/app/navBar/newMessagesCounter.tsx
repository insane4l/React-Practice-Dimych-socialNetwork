import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestNewMessagesCount } from '../../../reducers/dialogsReducer'
import * as authSelectors from '../../../selectors/auth'
import * as dialogsSelectors from '../../../selectors/dialogs'

import './newMessagesCounter.scss'


const NewMessagesCounter: React.FC<NewMessagesCounterPropsType> = React.memo( ({rerenderSecs}) => {
    const newMessagesCountRequestError = useSelector(dialogsSelectors.getNewMessagesCountRequestError)
    const newDialogsMessagesCount = useSelector(dialogsSelectors.getNewDialogsMessagesCount)
    const isUserAuthorized = useSelector(authSelectors.getIsAuthorized)
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
})

export default NewMessagesCounter



type NewMessagesCounterPropsType = {
    rerenderSecs: number
}