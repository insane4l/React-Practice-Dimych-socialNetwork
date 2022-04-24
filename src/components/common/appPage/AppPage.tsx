import React from 'react'
import { Helmet } from 'react-helmet-async'
import './AppPage.scss'

const AppPage: React.FC<AppPagePropsType> = React.memo( ({pageTitle, canonicalLink, children}) => {
    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                { canonicalLink && <link rel="canonical" href={canonicalLink} /> }
            </Helmet>

            <div className="section">
                {children}
            </div>
        </>
    )
})

export default AppPage


type AppPagePropsType = {
    pageTitle: string
    canonicalLink?: string
}