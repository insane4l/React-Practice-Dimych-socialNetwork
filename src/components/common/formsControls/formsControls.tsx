import React, { HTMLAttributes } from 'react';
import { Field, WrappedFieldInputProps, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import { FieldValidatorType } from '../../../utils/validation/validators';

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


// React.FC<WrappedFieldProps> can't add className correctly
// !!!!({input: WrappedFieldInputProps, meta: WrappedFieldMetaProps, ...props}) cant type because of destructuring
// ({input, meta}: WrappedFieldProps, { ...props}) can't add className for return element
type CustomFieldProps = {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    className?: string
}

const CustomField = (Component: any): React.FC<CustomFieldProps> => ({input, meta, ...props}) => { // Component: HTMLElement
    const errorStatus = meta.error;
    const hasError = errorStatus && meta.touched;

    const errorClassName = hasError ? "error" : "";
    const fieldClassName = props.className || ""; // if the element already has a className

    return(
        <>
            <Component {...input} {...props} className={`${fieldClassName} ${errorClassName}`} />

            { hasError && <span className="error-status">{errorStatus}</span> }
        </>
    )
}

export const Textarea = CustomField('textarea');
export const Input = CustomField('input');

 
export function createField<FormKeysType extends string>(name: FormKeysType, component: React.FC<WrappedFieldProps> | string,
                            validators: Array<FieldValidatorType>, placeholder: string | undefined,
                            props = {}) {
    return <Field name={name}
           component={component}
           validate={validators}
           placeholder={placeholder}
           {...props}
        />
}