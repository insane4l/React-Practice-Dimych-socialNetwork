import React from 'react';

import './adsItem.scss';

const AdsItem = () => {
    return (
        <a href="#" className="ads__item">
            <div className="ads__item-img">
                <img src="https://clck.ru/VHpqu" alt="ads_image" />
            </div>
            <a className="ads__item-link" href="http://karpeyev.ru">karpeyev.ru</a>
            <div className="ads__item-title">Создадим сайт любой сложности под ваши задачи</div>
        </a>
    );
}

export default AdsItem;