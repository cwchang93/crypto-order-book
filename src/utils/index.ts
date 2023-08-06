
export const priceFormatter = (number: number) => {
    return new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 1,
    }).format(number);
};

export const sizeFormatter = (number: number) => {
    return new Intl.NumberFormat().format(number);
};