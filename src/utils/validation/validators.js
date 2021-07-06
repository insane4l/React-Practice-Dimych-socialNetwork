export const required = (value) => {
    if(!value) return "Field required";

    return undefined
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength) return `Max ${maxLength} symbols`;
    
    return undefined;
}