import React from 'react';

import {adsImg} from '../../../assets/images';
import './adsBlock.scss'

const AdsBlock = () => {
    return (
        <a href="https://karpeyev.ru" className="ads__content">
            <div className="ads__content-img">
                <img src={adsImg} alt="ads_image" />
            </div>
            <div className="ads__content-link">karpeyev.ru</div>
            <div className="ads__content-title">Создадим сайт любой сложности под ваши задачи</div>
        </a>
    );
}

export default AdsBlock;