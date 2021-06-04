import React from 'react';
import AdsItem from './adsItem';

import './adsBlock.scss';

const AdsBlock = () => {
    return (
        <div className="ads__block">
            <div className="ads__block-title">Ads</div>
            <div className="ads__block-content">
                <AdsItem />
            </div>
        </div>
    );
}

export default AdsBlock;