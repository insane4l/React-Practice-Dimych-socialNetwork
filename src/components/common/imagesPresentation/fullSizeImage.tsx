import React, { useEffect } from 'react'
import { calcBrowserScrollWidth } from '../../../utils/calcBrowserScrollWidth'

import './fullSizeImage.scss'


const FullSizeImage: React.FC<FullSizeImagePropsType> = ({source, closeHandler}) => {

    useEffect(() => {
        const browserScrollWidth = calcBrowserScrollWidth();
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${browserScrollWidth}px`;
        document.querySelector<HTMLElement>('header.header')!.style.paddingRight = `${browserScrollWidth}px`;
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.marginRight = `0`;
            document.querySelector<HTMLElement>('header.header')!.style.paddingRight = `0`;
        }
    },[])
    
    return (
        <div className="fsi" onClick={closeHandler}>
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