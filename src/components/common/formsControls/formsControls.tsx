import React from 'react'
import { Field, WrappedFieldInputProps, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import { FieldValidatorType } from '../../../utils/validation/validators'

import './formsControls.scss'


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
export const Input = CustomField('input')

 
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



export type CustomFieldProps = {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    className?: string
}