import express from 'express';
import type { Request, Response } from 'express';
import { ValidateRequest } from '../middlewares/validate-request.ts';
import {User} from "../models/user.ts"
import  {body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { BadRequestError } from '../errors/bad-request-error.ts';

const router = express.Router()

router.post('/api/users/signup',[
    body('email')
    .isEmail()
    .withMessage('Email Must be valid'),
    body('password')
    .trim()
    .isLength({min:4,max:20})
    .withMessage("Password must be  between 4 to 20 characters")
],
ValidateRequest,
async (req:Request,res:Response)=>{
   
  const {email,password} = req.body
  const existingUser = await User.findOne({email});
  if(existingUser){
    throw new BadRequestError('Email In use')
  }

const user =User.build({email,password});
await user.save();
//Generate JWT

const userJwt = jwt.sign({id:user._id,email:user.email},process.env.JWT_KEY!);

req.session = {jwt:userJwt}
res.status(201).send(user)
 

})


export {router as signupRouter};