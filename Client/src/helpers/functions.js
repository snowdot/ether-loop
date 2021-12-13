export const generateRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

export const getCurPath = () => {
    const str = window.location.pathname;
    return str[str.length - 1] === '/' ? str.substring(-1) : str;
}

export const trimAddress = address => {
    const checkUD = address.split("").indexOf(".");

    if(checkUD !== -1) {
        return address;
    } else {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    }
}

export const getRandomNumber = max => {
    return Math.floor(Math.random() * max) + 1;
}

export const getRandomColor = () => {
    const r = getRandomNumber(256);
    const g = getRandomNumber(256);
    const b = getRandomNumber(256);
    return `rgb(${r},${g},${b})`;
}

export const intlCompactCurrNumFormat = function (num, curr, locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: curr,
        notation: "compact",
        compactDisplay: "short"
    }).format(num);
}

export const intlMultipleDecimalNumFormat = function (num, locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: "decimal",
        maximumFractionDigits: 4
    }).format(num);
}

export const intlCompactNumFormat = function (num, locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        notation: "compact",
        compactDisplay: "short"
    }).format(num);
}

export const intlDecimalNumFormat = function (num, locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 2
    }).format(num);
}

export const intlPercentNumFormat = function (num, locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 2
    }).format(num);
}

export const intlCurrNumFormat = function (num, curr = "usd", locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: curr,
        minimumFractionDigits: 2
    }).format(num);
}
