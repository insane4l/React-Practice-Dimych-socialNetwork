import React from 'react';

import './profilePage.scss';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        message: 'status text here'
    }

    toggleModes = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    updateMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }


    render() {

        const statusText = <div className="profile__status-text"
                                onDoubleClick={this.toggleModes} >
                            {this.state.message}</div>;

        const statusInput = <input className="profile__status-input"
                                   value={this.state.message}
                                   type="text"
                                   autoFocus
                                   onChange={this.updateMessage}
                                   onBlur={this.toggleModes} />;

        return (
            <div className="profile__status">
                {this.state.editMode ? statusInput : statusText}
            </div>
        )
    }
}

export default ProfileStatus;