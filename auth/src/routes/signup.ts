import express from 'express';
const router = express.Router()

router.post('/api/users/signup',(req,res)=>{
    return res.send("Hi There")

})


export {router as signupRouter};