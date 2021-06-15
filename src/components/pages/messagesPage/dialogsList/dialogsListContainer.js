import React from 'react';
import DialogsList from './';
import {connect} from 'react-redux';



const mapStateToProps = (state) => {
    return {
        dialogs: state.messagesPage
    }
};
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
const DialogsListContainer = connect(mapStateToProps, mapDispatchToProps)(DialogsList);


export default DialogsListContainer;