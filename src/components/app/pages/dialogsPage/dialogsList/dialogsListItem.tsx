import React from 'react'
import { Link } from 'react-router-dom'
import { defaultPhoto } from '../../../../../assets/images'
import { AllDialogsListItemType } from '../../../../../services/dialogsAPI'

const DialogsListItem: React.FC<PropsType> = ({dialogsItem}) => {

    const {id, photos, userName, lastUserActivityDate, hasNewMessages,
        newMessagesCount, lastDialogActivityDate} = dialogsItem
    const style = dialogsItem.hasNewMessages ? "dialogs__list-item_new" : "dialogs__list-item"

    return (
        <li>
            <Link className={style} to={`/dialogs/${id}`}>
                <div className="dialog__image">
                    <img src={photos.small || defaultPhoto} alt="user_image" />
                </div>
                <div className="dialog__content">
                    <div className="dialog__content-title">
                        {userName}
                        <span className="dialog__content-subtitle">
                            {` (last seen ${lastUserActivityDate})`}
                        </span>
                    </div>
                    
                    <div className="dialog__content-message">
                        {hasNewMessages 
                            ? `There are ${newMessagesCount} new messages` 
                            : `Last message on ${lastDialogActivityDate}`}
                    </div>
                </div>
            </Link>
        </li>
    )
}


export default DialogsListItem



type PropsType = {
    dialogsItem: AllDialogsListItemType
}