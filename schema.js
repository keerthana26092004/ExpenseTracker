const express = require('express')
const mongoose = require('mongoose')


const expenseTrackerSchema = new mongoose.Schema({
amount : {
    type : Number
         },
category : {
     type : String
           } ,
date : {
     type : Date
}   

})
  
const Expense = mongoose.model('expensedetails',expenseTrackerSchema)
module.exports  = { Expense}