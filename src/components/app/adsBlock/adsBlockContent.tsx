import React from 'react';

import {adsImg} from '../../../assets/images';

const AdsBlockContent = () => {
    return (
        <a href="https://ads.com" className="ads__content">
            <div className="ads__content-img">
                <img src={adsImg} alt="ads_image" />
            </div>
            <a className="ads__content-link" href="http://karpeyev.ru">karpeyev.ru</a>
            <div className="ads__content-title">Создадим сайт любой сложности под ваши задачи</div>
        </a>
    );
}

export default AdsBlockContent;