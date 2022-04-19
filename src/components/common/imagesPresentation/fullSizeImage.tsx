import React, { useEffect } from 'react'
import { toggleBodyScroll } from '../../../utils/toggleBodyScroll'

import './fullSizeImage.scss'


const FullSizeImage: React.FC<FullSizeImagePropsType> = ({source, closeHandler}) => {

    useEffect(() => {
        toggleBodyScroll('hide');
        return () => {
            toggleBodyScroll('show');
        }
    },[])

    const closeOnOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ( !(e.target as HTMLImageElement)?.classList?.contains('fsi__picture') ) {
            closeHandler();
        }
    }
    
    return (
        <div className="fsi" onClick={closeOnOverlayClick}>
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