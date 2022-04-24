import React from 'react';

import './footer.scss';

const Footer = React.memo( () => {
    return (
        <div className="container">
        <footer className="footer">
            
                Created for educational purposes © <a href="http://karpeyev.com" target="_blank" rel="noreferrer" className="author-link">insane4L</a>
            
        </footer>
        </div>
    )
})


export default Footer;