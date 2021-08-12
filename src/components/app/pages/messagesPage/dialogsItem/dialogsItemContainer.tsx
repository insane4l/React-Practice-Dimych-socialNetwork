import DialogsItem from '.'
import {actions} from '../../../../../reducers/messagesReducer'
import {connect} from 'react-redux'
import { AppStateType } from '../../../../../reduxStore'
import { Dispatch } from 'react'



const mapStateToProps = (state: AppStateType) => {
    return {
        messages: state.messagesPage.messages
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        sendMessage: (date: string, messageBody: string) => {
            dispatch(actions.sendMessageAction(date, messageBody));
        }
    }
}

const DialogsItemContainer = connect(mapStateToProps, mapDispatchToProps)(DialogsItem)


export default DialogsItemContainer