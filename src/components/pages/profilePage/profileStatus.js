import React from 'react';

import './profilePage.scss';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        message: ""
    }

    toggleModes = () => {
        
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateProfileStatus(this.state.message);
    }

    updateMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }


    render() {

        const statusText = <div className="profile__status-text"
                                onDoubleClick={this.activateEditMode} >
                            {this.props.profileStatus || "......"}</div>;

        const statusInput = <input className="profile__status-input"
                                   value={this.state.message}
                                   type="text"
                                   autoFocus
                                   onChange={this.updateMessage}
                                   onBlur={this.deactivateEditMode} />;

        return (
            <div className="profile__status">
                {this.state.editMode ? statusInput : statusText}
            </div>
        )
    }
}

export default ProfileStatus;