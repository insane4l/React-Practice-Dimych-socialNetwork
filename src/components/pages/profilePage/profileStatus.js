import React from 'react';

import './profilePage.scss';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        message: this.props.profileStatus
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
            message: e.currentTarget.value
        })
    }



    componentDidUpdate(prevProps) {
        if (prevProps.profileStatus !== this.props.profileStatus) {
            this.setState({
                message: this.props.profileStatus
            });
        }
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