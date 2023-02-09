import React, { useEffect, useState } from "react";
import { calculateInterestRate } from "components/utils/calculateInterestRate";
import compareLogo from "assets/images/Compare.svg";
import "./InterestRateResult.scss";

interface IProps {
    loanInput: string;
    selectedMortgageRate: string;
}

const InterestRateResult = ({ loanInput, selectedMortgageRate }: IProps) => {
    const [interestRateToDisplay, setInterestRateToDisplay] = useState<string>("0");
    const [calculatedInterestRatePerMonth, setCalculatedInterestRatePerMonth] = useState<number>(0);

    useEffect(() => {
        if(selectedMortgageRate && selectedMortgageRate !== "Välj i listan") {
            //split string at - , and save item from index 1
            const splitMortgageRate = selectedMortgageRate.split("-")[1];
            setInterestRateToDisplay(splitMortgageRate);
            //remove last character %, and convert to float
            const mortgageRate = parseFloat(splitMortgageRate.slice(0, -1));
            const calculated = calculateInterestRate(Number(loanInput), mortgageRate);
            setCalculatedInterestRatePerMonth(calculated);
        }
    }, [selectedMortgageRate, loanInput]);

    return (
        <div className="interest-rate-result-wrapper">
            <h4>Din räntekostnad - {interestRateToDisplay ? interestRateToDisplay : selectedMortgageRate}</h4>
            <div className="display-result">
                <img src={compareLogo} alt="SBAB compare logo" />
                <h1>{calculatedInterestRatePerMonth?.toFixed()} kr / mån</h1>
            </div>
        </div>
    )
}
export { InterestRateResult };