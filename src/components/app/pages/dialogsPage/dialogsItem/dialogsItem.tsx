import React from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import DialogForm from './dialogForm'
import * as icons from '../../../../../assets/icons'
import './dialogsItem.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../../reduxStore'
import { useEffect } from 'react'
import { actions, requestDialogMessages, sendMessage } from '../../../../../reducers/dialogsReducer'
import MessagesList from '../../../../common/messagesComponents/messagesList'
import { defaultPhoto } from '../../../../../assets/images'


const DialogsItem: React.FC = () => {
    
    const messages = useSelector( (state: AppStateType) => state.dialogsPage.selectedDialogMessages )
    const isLoading = useSelector( (state: AppStateType) => state.dialogsPage.isLoading )
    const match = useRouteMatch<MatchParamsType>()
    const dispatch = useDispatch()

    const userId = Number(match.params.userId)

    const sendDialogMessage = (message: string) => {
        dispatch( sendMessage(userId, message) )
    }
    

    useEffect( () => {
        dispatch( requestDialogMessages(userId) )
    }, [])


    return (
        <div className="dialogs__item">
            <DialogsItemHeader friendId={userId} />
                                 
            <MessagesList dialogMessages={messages} isLoading={isLoading} />

            <DialogForm sendMessage={sendDialogMessage} />
        </div>
    )
}

const DialogsItemHeader: React.FC<DialogHeaderPropsType> = ({friendId}) => {
    
    const interlocuter = useSelector( (state: AppStateType) => state.dialogsPage.dialogInterlocuterProfile)
    const dispatch = useDispatch()

    useEffect( () => {
        return () => {
            dispatch( actions.interlocuterProfileReceived(null) )
        }
    }, [])

    return (
        <div className="dialogs__item-header">
            <Link className="go-back__link" to="/dialogs"> 
                <img className="go-back__icon" src={icons.goBack} alt="go_back_icon" />
                <div className="go-back__text">Go back</div>
            </Link>

            <Link className="interlocuter" to={`/profile/${friendId}`}>
                <div className="interlocuter__image">
                    <img src={interlocuter?.photos.small || defaultPhoto} alt="interlocuter_image" />
                </div>
                <div className="interlocuter__name">{interlocuter?.fullName}</div>
            </Link>
        </div>
    )
}


export default DialogsItem



type MatchParamsType = {userId: string}

type DialogHeaderPropsType = {
    friendId: number
}