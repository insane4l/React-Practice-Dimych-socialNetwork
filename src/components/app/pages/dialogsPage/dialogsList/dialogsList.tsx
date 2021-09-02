import React from 'react';

import './dialogsList.scss';

const DialogsList: React.FC = () => {
    return (
        <>
            <div className="dialogs__wrapper">
                <ul className="dialogs__list">
                    <li className="dialogs__list-item">
                        <div className="dialog__image">
                            <img src="https://sun9-39.userapi.com/impg/c856036/v856036795/1bd10a/MeUsoXHb5Vo.jpg?size=803x537&quality=96&sign=225fef18e43c9596ceb70af50a59ee25&type=album" alt="user_image" />
                        </div>
                        <div className="dialog__content">
                            <div className="dialog__content-title">Dimych Kuzyuberdin</div>
                            <div className="dialog__content-message">Hello Roman. What about your Social Network project?</div>
                        </div>
                    </li>
                    <li className="dialogs__list-item">
                        <div className="dialog__image">
                            <img src="https://ukranews.com/upload/news/2020/07/28/5f208e749f631-----------_1200.jpg" alt="user_image" />
                        </div>
                        <div className="dialog__content">
                            <div className="dialog__content-title">Pavel Durov</div>
                            <div className="dialog__content-message">Wow this is amazing app! Good work Roman!</div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default DialogsList;