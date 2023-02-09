export const calculateInterestRate = (loan: number, interestRate: number) => {
    const moveDecimals = interestRate/Math.pow(10, 2);
    const limitDecimals = moveDecimals.toFixed(4);
    return loan * Number(limitDecimals) / 12;
};