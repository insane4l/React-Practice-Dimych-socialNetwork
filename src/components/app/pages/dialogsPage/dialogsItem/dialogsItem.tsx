import React from 'react'
import {Link} from 'react-router-dom'
import DialogForm from './dialogForm'
import * as icons from '../../../../../assets/icons'
import './dialogsItem.scss'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../../../reduxStore'
import MessagesList from '../../../../common/messagesComponents/messagesList'


const DialogsItem: React.FC = () => {

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