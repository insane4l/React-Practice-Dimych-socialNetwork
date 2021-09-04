import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import DialogForm from './dialogForm'
import * as icons from '../../../../../assets/icons'
import './dialogsItem.scss'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../../../reduxStore'
import MessagesList from '../../../../common/messagesComponents/messagesList'
import { dialogsAPI } from '../../../../../services/dialogsAPI'


const DialogsItem: React.FC = () => {

        
    useEffect( () => {   // TESTING API REQUESTS

        // dialogsAPI.getAllDialogsList()

        // dialogsAPI.getUserMessagesList(16320, 10, 1)

        // dialogsAPI.sendMessageToUser(16320, 'testtttt')

        // dialogsAPI.setDialogAtTheDialogsListTop(14014)

        // dialogsAPI.getMessageViewedStatus("f5396317-8b4e-4376-b9bb-2ea208f62ac9")

        // dialogsAPI.markMessageAsSpam("13be929a-de39-4437-b946-0e257822c963")

        // dialogsAPI.deleteMessage("13be929a-de39-4437-b946-0e257822c963")

        // dialogsAPI.restoreMessage("13be929a-de39-4437-b946-0e257822c963")

        // dialogsAPI.getMessagesNewerThenDate(16320, "2021-09-04T10:13:41.23")

        // dialogsAPI.getNewMessagesTotalCount()
    
    }, [])

    const messages = useSelector( (state: AppStateType) => state.dialogsPage.messages )

    return (
        <div className="dialogs__item">
            <DialogsItemHeader />
                             
            <MessagesList messages={messages} />

            <DialogForm />
        </div>
    )
}

const DialogsItemHeader = () => {
    return (
        <div className="dialogs__item-header">
            <Link className="go-back__link" to="/messages"> 
                <img className="go-back__icon" src={icons.goBack} alt="go_back_icon" />
                <div className="go-back__text">Go back</div>
            </Link>

            <Link className="interlocuter" to={`/profile/${1111}`}>
                <div className="interlocuter__image">
                    <img src="https://tehnot.com/wp-content/uploads/2017/09/pavel.jpg" alt="interlocuter_image" />
                </div>
                <div className="interlocuter__name">Pavel Durov</div>
            </Link>
        </div>
    )
}


export default DialogsItem