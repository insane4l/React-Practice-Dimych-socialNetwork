import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestDialogMessages } from '../../../../../reducers/dialogsReducer'
import { AppStateType } from '../../../../../reduxStore'

const DialogPagination: React.FC<DialogPaginationPropsType> = ({userId, messagesPortionSize}) => {

    const loadedMessagesCount = useSelector( (state: AppStateType) => state.dialogsPage.selectedDialogMessages.length )
    const dialogMessagesCount = useSelector( (state: AppStateType) => state.dialogsPage.selectedDialogMessagesCount )
    const portionsCount = Math.ceil(dialogMessagesCount / messagesPortionSize)
    const viewedPortionsCount = Math.ceil(loadedMessagesCount / messagesPortionSize)
    const oldMessagesPortionNumber =  viewedPortionsCount + 1

    const dispatch = useDispatch()

    const showOldMessages = () => {
        if (userId) {
            dispatch( requestDialogMessages(userId, oldMessagesPortionNumber, messagesPortionSize) )
        }
    }

    return (
        <>
            {portionsCount > viewedPortionsCount
                ? <div className="dialogs__item-pagination" onClick={showOldMessages}>^^^</div>
                : <span></span>
            }
        </>
    )
}

export default DialogPagination



type DialogPaginationPropsType = {
    userId: number | undefined
    messagesPortionSize: number
}