import express from 'express';
import {currentUserRouter} from "./routes/current-user.ts"
import {signinRouter} from "./routes/signin.ts"
import {signoutRouter} from "./routes/signout.ts"
import {signupRouter} from "./routes/signup.ts"
const app = express()
app.use(express.json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.listen(3000,()=>{
    console.log("Listening to port 3000######!!!")
})