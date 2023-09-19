import { ADDRESS_AMOUNT_REGEX, ADDRESS_REGEX, AMOUNT_REGEX } from "./constants";

export const checkAddressAmount = ({address, amount, index }) => {
    if(!ADDRESS_AMOUNT_REGEX.test(`${address} ${amount}`)) { 
        if(!ADDRESS_REGEX.test(address)) {
            return `Line ${index+1} wrong address`;
            
        } else if(!AMOUNT_REGEX.test(amount)) {
            return `Line ${index+1} wrong amount`;   
        }
    }
}