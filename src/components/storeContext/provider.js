import React from 'react';
import StoreContext from './storeContext';

const Provider = (props) => {
    return (
        <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default Provider;