import React from 'react';

import './formsControls.scss';

// export const Textarea = ({input, meta, ...props}) => {

//     const errorStatus = meta.error;
//     const hasError = errorStatus && meta.touched;

//     const errorClassName = hasError ? "error" : "";
//     const fieldClassName = props.className || "";
    

//     return(
//         <>
//         <textarea {...input} {...props} className={`${fieldClassName} ${errorClassName}`} /> 
//         {/* {...meta} dont need to spread!! because of errors */}
//         { hasError && <span className="error-status">{errorStatus}</span> }
//         </>
//     )
// }

const CustomField = (Component) => ({input, meta, ...props}) => {
    const errorStatus = meta.error;
    const hasError = errorStatus && meta.touched;

    const errorClassName = hasError ? "error" : "";
    const fieldClassName = props.className || "";
    

    return(
        <>
        <Component {...input} {...props} className={`${fieldClassName} ${errorClassName}`} />

        { hasError && <span className="error-status">{errorStatus}</span> }
        </>
    )
}

export const Textarea = CustomField('textarea');
export const Input = CustomField('input');