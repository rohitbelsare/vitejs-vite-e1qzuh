import { useState } from "react";
import {  DELIMITER } from "./constants";
import { checkAddressAmount } from "./utils";
import NumberedTextarea from "./NumberedTextarea";
import ErrorBox from "./ErrorBox";

const Disperse = () => {
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [duplicateAddressDict, setDuplicateAddressDict] = useState({});
    

    const checkValidations = ( param = {}) => {
        const textArray = param?.textArray ?? text.split('\n');
        const errorPronText = [];
        const addressDict = {};
        textArray.forEach((item, index) => {
            const delimiter = item[item.search(DELIMITER)];
            // Skip blank line
            if(!item) { 
                return;
            }
            const [address, amount] = item.split(delimiter);
            const error = checkAddressAmount( { address, index, amount })
            // if error skip duplicate check
            if(error) {
                errorPronText.push(error);
                return;
            } 

            // maintian a dict of address and index/s
            if(!addressDict[address]) {
                addressDict[address] = [index];
            } else if (addressDict[address]) {
                addressDict[address].push(index);
            }
        });
        const duplicateAddress = {};
        
        Object.entries(addressDict)
              .filter(([,indexArray]) => indexArray.length > 1) // filter out non duplicate
              .map(([address, indexArray]) => {
                    duplicateAddress[address] = indexArray;
                    return errorPronText.push(`Address ${address} encountered duplicate in Line: ${indexArray.map(i=>i+1).join(', ')} `);
                });
        setDuplicateAddressDict(duplicateAddress);
        setError(errorPronText.map((text) => <div key={text}>{text}</div>));
        setIsValid(errorPronText.length === 0);

    };

    const keepTheFirstOne = () => {
        const tempDict = {};
        const textArray = text.split('\n').filter((item) => {
            // Skip blank line
            if(!item) { 
                return false;
            }
            const delimiter = item[item.search(DELIMITER)];
            const [a] = item.split(delimiter);
            if(duplicateAddressDict[a] && tempDict[a]) {
                return false;
            }
            tempDict[a] = true;
            return true;
        });
        setText(textArray.join('\n'));
        checkValidations({ textArray });
    };

    const combineBalance = () => {
        const tempDict = {};
        text.split('\n').forEach((item) => {
            // Skip blank line
            if(!item) { 
                return;
            }
            const delimiter = item[item.search(DELIMITER)];
            const [a, amount] = item.split(delimiter);
            if(!tempDict[a]) {
                tempDict[a] = parseInt(amount)
            } else {
            tempDict[a] += parseInt(amount);
            }
        });
        const textArray = Object.entries(tempDict).map(([address, amount]) => `${address} ${amount}`);
        setText(textArray.join('\n'));
        checkValidations({ textArray });
    };

    return (
    <div className="h-full flex flex-col gap-5 min-w-[475px]">
        <div>
            <NumberedTextarea setText={setText} text={text}  />
            <div className="text-left text-gray-500">Separated by ',' or '' or =</div>
        </div>
        {Object.keys(duplicateAddressDict).length > 0 && (
            <div className="flex-1 flex justify-between text-red-600">
                <div>Duplicate</div>
                <div className="flex gap-4">
                    <button onClick={keepTheFirstOne}>Keep the first one</button>
                    <div className="h-[24px] py-1 w-[1px] bg-black"/>
                    <button onClick={combineBalance}>Combine Balance</button>
                </div>
            </div>
        )}
        <ErrorBox error={error} />
        <div className="flex-1 flex">
            <button onClick={checkValidations} className={` text-white text-sm p-3 rounded flex-1 ${ isValid ? 'bg-purple-800' : 'bg-blue-800'}`}> Next </button>
        </div>
    </div>);

};
export default Disperse;