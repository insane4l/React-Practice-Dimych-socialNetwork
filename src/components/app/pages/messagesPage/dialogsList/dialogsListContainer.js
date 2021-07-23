import React from 'react';
import DialogsList from './';
import {connect} from 'react-redux';



const mapStateToProps = (state) => {
    return {
        dialogs: state.messagesPage
    }
};

const DialogsListContainer = connect(mapStateToProps)(DialogsList);


export default DialogsListContainer;