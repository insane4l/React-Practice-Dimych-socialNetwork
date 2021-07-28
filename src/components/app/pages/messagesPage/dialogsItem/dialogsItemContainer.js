import DialogsItem from './';
import {sendMessageAction} from '../../../../../reducers/messagesPageReducer';
import {connect} from 'react-redux';



const mapStateToProps = (state) => {
    return {
        messages: state.messagesPage.messages
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (messageBody) => {
            const newDate = new Date();
            const day = newDate.getDate();
            const month = newDate.getMonth() +1;
            const hours = newDate.getHours() % 24;
            const minutes = newDate.getMinutes() % 60;
    
            const date = `${day}.${month} ${hours}:${minutes}`;
    
            dispatch(sendMessageAction(date, messageBody));
        }
    }
};

const DialogsItemContainer = connect(mapStateToProps, mapDispatchToProps)(DialogsItem);


export default DialogsItemContainer;