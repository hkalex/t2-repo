// @CLONE ../../../t1-repo/src/react-app/pages/FirstPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator } from "../../../shared/src/Calculator";
//import { Calculator } from "./Calculator"; // Symbolic link

const FirstPage: React.FC = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/second');
    };
    const [num1, setNum1] = React.useState<number>(0);
    const [num2, setNum2] = React.useState<number>(0);
    const [sum, setSum] = React.useState<number | null>(null);

    const handleSum = () => {
        var calculator = new Calculator();
        var result = calculator.add(num1, num2);
        setSum(result);
    };

    return (
        <div>
            <h1>First Page in T1-Repo</h1>
            {/* <h2>Symbolic link</h2> */}
            <div>
                <input
                    type="number"
                    value={num1}
                    onChange={e => {
                        const value = e.target.value;
                        if (/^-?\d*\.?\d*$/.test(value)) {
                            setNum1(value === "" ? 0 : Number(value));
                        }
                    }}
                    placeholder="Enter first number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                />
                <input
                    type="number"
                    value={num2}
                    onChange={e => {
                        const value = e.target.value;
                        if (/^-?\d*\.?\d*$/.test(value)) {
                            setNum2(value === "" ? 0 : Number(value));
                        }
                    }}
                    placeholder="Enter second number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                />
                <button onClick={handleSum}>Sum</button>
                <input
                    type="text"
                    value={sum !== null ? sum : ""}
                    readOnly
                    placeholder="Result"
                />
            </div>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default FirstPage;