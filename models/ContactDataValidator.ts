import { ContactData } from "./ContactData";

export enum ContactDataValidatorState {
    OK = 'OK', EMAIL_REQUIRED = 'EMAIL_REQUIRED', FIRSTNAME_REQUIRED = 'FIRSTNAME_REQUIRED', LASTNAME_REQUIRED = 'LASTNAME_REQUIRED', EMAIL_FORMAT = 'EMAIL_FORMAT'
}

export class ContactDataValidator {
    /**
     * Source: https://emailregex.com/
     */
    private static emailRegex: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    private static validateRequired(value: string) : boolean {
        return value !== undefined && value.trim().length > 0;
    }

    public static validateFirstname(value: string) : ContactDataValidatorState {
        if(!this.validateRequired(value)) {
            return ContactDataValidatorState.FIRSTNAME_REQUIRED;
        } else {
            return ContactDataValidatorState.OK;
        }
    }

    public static validateLastname(value: string) : ContactDataValidatorState {
        if(!this.validateRequired(value)) {
            return ContactDataValidatorState.LASTNAME_REQUIRED;
        } else {
            return ContactDataValidatorState.OK;
        }
    }

    public static validateEmail(value: string): ContactDataValidatorState {
        if(!this.validateRequired(value)) {
            return ContactDataValidatorState.EMAIL_REQUIRED;
        } else if(!this.emailRegex.test(value)) {
            return ContactDataValidatorState.EMAIL_FORMAT;
        } else {
            return ContactDataValidatorState.OK;
        }
    }

    public static validateAll(contactData: ContactData): ContactDataValidatorState[] {
        const output = [];
        let actualState: ContactDataValidatorState = this.validateFirstname(contactData.firstname);
        if(actualState != ContactDataValidatorState.OK) {
            output.push(actualState);
        }
        actualState = this.validateFirstname(contactData.firstname);
        if(actualState != ContactDataValidatorState.OK) {
            output.push(actualState);
        }
        actualState = this.validateFirstname(contactData.firstname);
        if(actualState != ContactDataValidatorState.OK) {
            output.push(actualState);
        }
        return output;
    }
}