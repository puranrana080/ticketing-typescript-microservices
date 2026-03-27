import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/new.ts';
import { showTicketRouter } from './routes/show.ts';
import { indexTicketRouter } from './routes/index.ts';
import { updateTicketRouter } from './routes/update.ts';



import { errorHandler, NotFoundError ,currentUser } from '@psrtickets/common';
const app = express()
app.set('trust proxy',true)
app.use(express.json())
app.use(cookieSession({signed:false,secure:true}))

app.use(currentUser)

app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)
app.use(updateTicketRouter)

app.use(async(req,res) => {
  throw new NotFoundError();
});
app.use(errorHandler)

const start =async()=>{
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KET must be defined')
    }
    if(!process.env.MONGO_URI){
        throw new Error ('MONGO_URI must be defined')
    }
    try{
          await mongoose.connect(process.env.MONGO_URI);
          console.log("Connected to mongoDB")

    }
    catch(err){
        console.error(err);
    }
    app.listen(3000,()=>{
    console.log("Listening to port 3000######!!!")
})
  
}
start()

