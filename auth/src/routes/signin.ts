import express from "express";
import type {Request ,Response} from "express"
import { body } from "express-validator";
import { User } from "../models/user.ts";
import jwt from "jsonwebtoken"

import { Password } from "../services/password.ts";
import {ValidateRequest , BadRequestError } from "@psrtickets/common"


const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body('password')
    .trim()
    .notEmpty()
    .withMessage("Enter password is must")
  ],
  ValidateRequest,
 async (req:Request, res:Response) => {
const {email,password}=req.body;
const existingUser = await User.findOne({email});
if(!existingUser){
    throw new BadRequestError('Invalid Credentials')
}
const passwordsMatch =await Password.compare(existingUser.password,password)
   if(!passwordsMatch){
    throw new BadRequestError('Invalid Credentials')
   }

   //Generate JWT
   
   const userJwt = jwt.sign({id:existingUser._id,email:existingUser.email},process.env.JWT_KEY!);
   
   req.session = {jwt:userJwt}
   res.status(200).send(existingUser)

  },
);

export { router as signinRouter };
