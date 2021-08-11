import DialogsList from '.';
import {connect} from 'react-redux';
import { AppStateType } from '../../../../../reduxStore';



const mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.messagesPage
    }
};

const DialogsListContainer = connect(mapStateToProps)(DialogsList);


export default DialogsListContainer;