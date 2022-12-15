interface Rule {
    type: 'required' | 'length'
}

interface Require extends Rule {
    type: 'required'
}
interface Lengthoptions{ 
    min: number,
    max: number
}
interface Length extends Rule {
    type: 'length',
    options: Lengthoptions
}
export interface Status{
    valid: boolean,
    message?: string
}

type Validator = Require | Length

export function required(): Require {
    return {
    type: 'required'

    }
}
export function length(options: Lengthoptions): Length {
    return {
    type: 'length',
    options

    }
}
export function validate(value: string | undefined, validators: Validator[]): Status {
    for(const validator of validators) {
        if(validator.type === 'required') {
            if(!value || value.length === 0) {
                return {
                    valid: false,
                    message: 'this value is required'
                }
            }
        }
        if(validator.type === 'length') {
            if(value!.length < validator.options.min || value!.length > validator.options.max) {
                return {
                    valid: false,
                    message: `the value must be between ${validator.options.min} and ${validator.options.max}`
                }
            }
        }
    }
    return {
    valid: true

    }
}
//const result = validate('username', [required()]{
//    return{valid, message}
//})