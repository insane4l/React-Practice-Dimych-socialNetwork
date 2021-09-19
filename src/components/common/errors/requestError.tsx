import React from 'react'

import './requestError.scss'

const RequestError: React.FC<RequestErrorPropsType> = ({errorMessage}) => {
    return (
        <div className="request-error__block">
            <div className="request-error__message">
                {errorMessage}
            </div>
        </div>
    )
}

export default RequestError



type RequestErrorPropsType = {
    errorMessage: string
}