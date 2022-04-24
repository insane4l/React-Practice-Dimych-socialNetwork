import React from 'react';

import {adsImg} from '../../../assets/images';
import './adsBlock.scss'

const AdsBlock = React.memo( () => {
    return (
        <a href="https://karpeyev.com" target="_blank" rel="noreferrer" className="ads__content">
            <div className="ads__content-img">
                <img src={adsImg} alt="ads_image" />
            </div>
            <div className="ads__content-link">karpeyev.com</div>
            <div className="ads__content-title">Создадим сайт любой сложности под ваши задачи</div>
        </a>
    );
})

export default AdsBlock;