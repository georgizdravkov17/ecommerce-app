export default class Validator{
    static validateLenth(value, minLength, maxLength, propertyName){
        if(typeof value === 'string'){

            if(value.length < minLength || value.length > maxLength){
                throw new Error(`${propertyName} must be between ${minLength} and ${maxLength}`);
            }

        } else if(typeof value === 'number'){

             if(value < minLength || value > maxLength){
                throw new Error(`${propertyName} must be between ${minLength} and ${maxLength}`);
             }

        } else{
             throw new Error(`Invalid ${propertyName} argument type, you can't min or max value of ${typeof value}`);
        }

    }

    static validateType(requiredType, value, propertyName){
        if(typeof value !== requiredType){
            throw new Error(`Invalid type for ${propertyName}`);
        }
    }
}