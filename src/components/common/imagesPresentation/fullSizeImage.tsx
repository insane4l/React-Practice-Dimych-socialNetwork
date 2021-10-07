import React from 'react'

import './fullSizeImage.scss'


const FullSizeImage: React.FC<FullSizeImagePropsType> = ({source, closeHandler}) => {
    
    return (
        <div className="fsi">
            <div className="fsi__wrapper">
                <img className="fsi__picture" src={source} alt="full_size_image" />
                <span className="fsi_close" onClick={closeHandler}>&times;</span>
            </div>
        </div>
    )
}

export default FullSizeImage



type FullSizeImagePropsType = {
    source: string
    closeHandler: () => void
}