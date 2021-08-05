export type FieldValidatorType = (value: string) => undefined | string


export const required: FieldValidatorType = (value) => {
    if(!value) return "Field required";

    return undefined
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    if (value && value.length > maxLength) return `Max ${maxLength} symbols`;
    
    return undefined;
}