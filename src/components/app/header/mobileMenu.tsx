import React, { useState } from 'react'
import NavBar from '../navBar'

import './mobileMenu.scss'


const MobileMenu: React.FC = () => {
    
    const [isMenuVisible, setMenuVisibility] = useState(false)
    const burgerBtnStyle = isMenuVisible ? 'mobile__menu-btn mobile__menu-btn_active' : 'mobile__menu-btn'

    return (
        <div className="mobile__menu">
            <div className={burgerBtnStyle} onClick={() => setMenuVisibility(!isMenuVisible)}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            {isMenuVisible 
                && <div className="mobile__menu-content">
                        <NavBar closeMenu={() => setMenuVisibility(false)} />
                   </div>}
        </div>
    )
}

export default MobileMenu