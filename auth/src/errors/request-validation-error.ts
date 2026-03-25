import type { ValidationError } from "express-validator";
import { CustomError } from "./custom-error.ts";

export class RequestValidationError extends  CustomError  {
    statusCode =400;
 errors :ValidationError[];
    constructor(errors:ValidationError[]){
        super('Invalid request parameters');
        this.errors=errors
        Object.setPrototypeOf(this,RequestValidationError.prototype)

    }
    serializeErrors(){
        return this.errors.map(err=>{
           if (err.type === 'field') {
        return { message: err.msg, field: err.path };
      }
      return {message :err.msg}
        })
    }
}