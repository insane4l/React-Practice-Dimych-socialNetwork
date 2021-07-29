import React from 'react';
import AdsBlockContent from './adsBlockContent';

import './adsBlock.scss';

const AdsBlock = () => {
    return (
        <div className="ads__block">
            <div className="ads__block-title">Ads</div>
            <div className="ads__block-content">
                <AdsBlockContent />
            </div>
        </div>
    );
}

export default AdsBlock;