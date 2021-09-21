import React from 'react'

import './sideBarBlock.scss'


const SideBarBlock: React.FC<PropsType> = ({children, blockTitle}) => {
    return (
        <div className="sidebar__block">
            <div className="sidebar__block-title">{blockTitle}</div>
            <div className="sidebar__block-content">
                {children}
            </div>
        </div>
    )
}

export default SideBarBlock



type PropsType = {
    blockTitle: string | React.RefAttributes<HTMLAnchorElement>
}

