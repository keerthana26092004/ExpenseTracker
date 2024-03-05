
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const {Expense} = require('./schema.js')
const app = express()
app.use(bodyParser.json())
app.use(cors())

/**Expense Tracker
 * 
 * 
 * 
 * Adding a new expense/income :/add-expense -> post
 * Displaying existing expense:/get-expense ->get
 * Deleting expenses :/delete-expense ->delete
 * Editing existing user :edit-expense -> patch
 * Creating new user
 * Validating user
 * Budget reporting
 * 
 * 
 * Defing schemas
 * category , amount 

*/

//console.log("hello")

 async function connecttoDB(){
 try{
    await mongoose.connect('mongodb+srv://keerthana:atlas123@keerthanaravikumar188.lovbrra.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=keerthanaravikumar188')
    console.log("db connection established")
    const port =process.env.PORT || 4000
    app.listen(port,function(){
    console.log(`Listening on port ${port}....`)
    })
}
 
 catch(error){
   console.log(error)
   console.log("Couldnot establish connection")
 }
}

connecttoDB()
//adding

app.post('/add-expense',async function(request,response){
   try{
      await Expense.create({
         "amount" : request.body.amount,
         "category": request.body.category,
         "date" : request.body.date
      })
      response.status(201).json({
         "status" : "success",
         "message" : "new entry created"
      })
   }
      catch(error){
         response.status(500).json({
            "status" : "failure",
            "message" : "new entry failed",
            "error" : error
         })
      }
   })
   //getting
   app.get('/get-expense', async function(request, response){
      try{
         const expenseData = await Expense.find()
         response.status(200).json(expenseData)
      }
      catch(error){
         response.status(500).json({
            "status" : "failure",
            "message" : "couldnot fetch entries",
            "error": error
         })
      }
      }
   )
   //deleting

   app.delete('/delete-expense/:id' , async function(request, response){
      const expenseEntry =  await Expense.findById(request.params.id) 
      if(expenseEntry)   {
         Expense.findByIdAndDelete(request.params.id)
         response.status(201).json({
            "status" : "success",
            "message" : "delete entry"
         })
      }
         else {
            response.status(404).json({
               "status" : " failure" ,
               "message" : "couldnot find document"
            })
         }
            })

            //editing 
            app.patch('/edit-expense/:id',  async function(request, response){
               
                  try{
                     const expenseEntry =  await Expense.findById(request.params.id)
                     if(expenseEntry){
                         await expenseEntry.updateOne({
                           "amount"  : request.body.amount,
                           "category" : request.body.category,
                           "date" : request.body.date
                        })
                        response.status(200).json({
                           "status" :"success" ,
                           "message" : "updated entry"
                        })
                        
                     }
      
               else {
                  response.status(404).json({
                     "status" : "failure",
                     "message" : "could not update entry"

                  })
               }
            }
            catch(error) {
               response.status(501).json({
                  "status" : "failure",
                  "message" : "couldnot fetch entries",
                  "error": error
               })
            }
            })
      
         
   
                 

      

   
   
//  console.log(request.body)
//  response.json({
//     "status" : " response added"
//  })



