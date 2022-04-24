import React, { useCallback, useState } from 'react'
import NavBar from '../navBar'

import './mobileMenu.scss'


const MobileMenu: React.FC = React.memo( () => {
    
    const [isMenuVisible, setMenuVisibility] = useState(false)

    const toggleMenuVisibility = useCallback( () => {
        setMenuVisibility(isMenuVisible => !isMenuVisible)
    }, [])

    const hideMenu = useCallback(() => {
        setMenuVisibility(false);
    }, [])

    const burgerBtnStyle = isMenuVisible ? 'mobile__menu-btn mobile__menu-btn_active' : 'mobile__menu-btn'

    return (
        <div className="mobile__menu">
            <div className={burgerBtnStyle} onClick={toggleMenuVisibility}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            {isMenuVisible 
                && <div className="mobile__menu-content">
                        <NavBar closeMenu={hideMenu} />
                   </div>}
        </div>
    )
})

export default MobileMenu