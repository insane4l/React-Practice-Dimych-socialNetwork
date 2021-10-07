import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestAllDialogsList } from '../../../../../reducers/dialogsReducer'
import Spinner from '../../../../common/spinner'
import DialogsListItem from './dialogsListItem'
import * as dialogsSelectors from '../../../../../selectors/dialogs'

import './dialogsList.scss'


const DialogsList: React.FC = () => {
    
    const dialogsList = useSelector(dialogsSelectors.getDialogsList)
    const isLoading = useSelector(dialogsSelectors.getIsLoading)
    const dispatch = useDispatch()
    
    useEffect( () => {
        dispatch( requestAllDialogsList() )
    }, [])

    return (
        <div className="dialogs__wrapper">
            <ul className="dialogs__list">
                {isLoading ? <Spinner /> : dialogsList.map((d) => <DialogsListItem dialogsItem={d} key={d.id} />)}
            </ul>
        </div>
    )
}


export default DialogsList