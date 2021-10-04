export interface Validation {
    isValid: boolean;
    message: string;
    options?: string[];
  }

  class Validator {

    public static validateString(
        value: string = "",
        name: string,
        min: number = -1,
        max: number = -1
      ): Validation {
        let message: string = "";
        let isValid: boolean = true;
    
        if (value.trim().length <= 0) {
          isValid = false;
          message = `${name} cannot be empty.`;
        } else if (max !== -1 && value.trim().length < min) {
          isValid = false;
          message = `${name} must be at least ${min} characters.`;
        }
    
        if (max !== -1 && value.trim().length > max) {
          isValid = false;
          message = `${name} cannot be longer than ${max} characters.`;
        }
        return {
          isValid: isValid,
          message: message,
        };
      }

      public static validateEmail(email: string = ""): Validation {
        let message: string = "";
        let isValid: boolean = true;
    
        const regexp: RegExp = new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    
        if (!regexp.test(email)) {
          isValid = false;
          message = `Invalid email address.`;
        }
        if (email.trim().length < 1) {
          isValid = false;
          message = `Email address cannot be empty.`;
        }
    
        return {
          isValid: isValid,
          message: message,
        };
      }
    
  }

  export default Validator;