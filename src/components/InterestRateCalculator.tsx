import React, { useEffect, useState } from "react";
import { getMortgageRates } from "services/getMortgageRates";
import { InterestRateResult } from "./InterestRateResult";
import percentageImg from "assets/images/Percentage.svg";
import "./InterestRateCalculator.scss";

interface IMortgageData {
    mortgage_rates: [
        {
            binding_period_in_months: number,
            mortgage_rate: number,
        }
      ]
};

const InterestRateCalculator = () => {
    const [loanInput, setLoanInput] = useState<string>("0");
    const [mortgageData, setMortgageData] = useState<IMortgageData>();
    const [selectedMortgageRate, setSelectedMortgageRate] = useState<string>("");

    useEffect(() => {
        const getData = async () => {
            const data = await getMortgageRates();
            setMortgageData(data);
        };
        getData();
    }, []);

    const handleOnChange = (value: string) => {
        setLoanInput(value);
    };

    const handleSelect = (value: string) => {
        setSelectedMortgageRate(value);
    };

    const handleOnClick = () => {
        if (loanInput === "0") {
            setLoanInput("");
        }
    }

    return (
        <div className="interest-rate-calculator-wrapper">
            <div className="interest-rate-calculator-upper-section">
                <div className="upper-section-text-wrapper">
                    <h1>Din räntekostnad</h1>
                    <p>Här ser du både våra aktuella boräntor och din räntekostnad per månad</p>
                </div>
                <img
                    className="percentage-img"
                    src={percentageImg}
                    alt="SBAB percentage logo"
                />
            </div>
            <>
            <h4>Få fram din räntekostnad direkt</h4>
            <form>
                <label>
                    Önskat lånebelopp:
                    <input 
                        type="number"
                        value={loanInput}
                        onChange={event => handleOnChange(event.target.value)}
                        onClick={handleOnClick}
                    />
                </label>
                <label>
                    Välj bindningstid
                    <select onChange={event => handleSelect(event.target.value)}>
                        <option>Välj i listan</option>
                        {mortgageData && mortgageData.mortgage_rates.map((item, index) => (
                            <option key={index}>
                                {item.binding_period_in_months} mån - {item.mortgage_rate}%
                            </option>
                        ))}
                    </select>
                </label>
            </form>
        </>
            <InterestRateResult
                loanInput={loanInput}
                selectedMortgageRate={selectedMortgageRate}
            />
        </div>
    )
};

export { InterestRateCalculator };