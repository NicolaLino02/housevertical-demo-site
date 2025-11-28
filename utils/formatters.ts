export const parseVal = (str: string | number) => {
    return Number(String(str).replace(/[^0-9]/g, ''));
};

export const extractScore = (str: string | number) => {
    return Number(String(str).replace(/[^0-9]/g, '').slice(0, 2)) || 50;
};
