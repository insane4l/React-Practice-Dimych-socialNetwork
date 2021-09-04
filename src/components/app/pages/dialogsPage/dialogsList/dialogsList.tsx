import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestAllDialogsList } from '../../../../../reducers/dialogsReducer'
import { AppStateType } from '../../../../../reduxStore'
import Spinner from '../../../../common/spinner'
import DialogsListItem from './dialogsListItem'

import './dialogsList.scss'

const DialogsList: React.FC = () => {
    
    const dialogsList = useSelector( (state: AppStateType) => state.dialogsPage.dialogsList )
    const isLoading = useSelector( (state: AppStateType) => state.dialogsPage.isLoading )
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