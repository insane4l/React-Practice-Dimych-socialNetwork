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
import { ProfileType } from '../../../../../types/types'
import RequestError from '../../../../common/errors/requestError'
import DialogPagination from './dialogPagination'


const DialogsItem: React.FC = () => {

    const messages = useSelector( (state: AppStateType) => state.dialogsPage.selectedDialogMessages )
    const interlocuter = useSelector( (state: AppStateType) => state.dialogsPage.dialogInterlocuterProfile)
    const authUserImg = useSelector( (state: AppStateType) => state.auth.authUserPhoto)
    const isLoading = useSelector( (state: AppStateType) => state.dialogsPage.isLoading )
    const requestingMessagesError = useSelector( (state: AppStateType) => state.dialogsPage.requestErrors.requestingMessagesError )


    //pagination
    const messagesPortionSize = 10


   
    const match = useRouteMatch<MatchParamsType>()
    const dispatch = useDispatch()

    const userId = Number(match.params.userId)



    const sendDialogMessage = (message: string) => {
        dispatch( sendMessage(userId, message) )
    }
    

    useEffect( () => {
        dispatch( requestDialogMessages(userId, 1, messagesPortionSize) )

        return () => {
            dispatch( actions.dialogMessagesCleaned() )
            dispatch( actions.interlocuterProfileReceived(null) )
        }
    }, [])



    if (requestingMessagesError) {
        return (
            <div className="dialogs__item">
                <RequestError errorMessage={requestingMessagesError} />
            </div>
        )
    }
    return (
        <div className="dialogs__item">
            <DialogsItemHeader friend={interlocuter} />   
            <MessagesList 
                dialogMessages={messages}
                dialogMessagesPortionSize={messagesPortionSize}
                isLoading={isLoading}
                friendId={userId}
                friendImg={interlocuter?.photos.small}
                ownerImg={authUserImg} />

            <DialogForm sendMessage={sendDialogMessage} />
        </div>
    )
}



const DialogsItemHeader: React.FC<DialogHeaderPropsType> = ({friend}) => {

    return (
        <div className="dialogs__item-header">
            <Link className="go-back__link" to="/dialogs"> 
                <img className="go-back__icon" src={icons.goBack} alt="go_back_icon" />
                <div className="go-back__text">Go back</div>
            </Link>

            <Link className="interlocuter" to={`/profile/${friend?.userId}`}>
                <div className="interlocuter__image">
                    <img src={friend?.photos.small || defaultPhoto} alt="interlocuter_image" />
                </div>
                <div className="interlocuter__name">{friend?.fullName}</div>
            </Link>
        </div>
    )
}


export default DialogsItem



type MatchParamsType = {userId: string}

type DialogHeaderPropsType = {
    friend: ProfileType | null
}