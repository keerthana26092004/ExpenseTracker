// import { useState } from "react"

// export const Expense_trackerform = () => {
//     const [error , seterror] = useState({})
//     const [category , secategory] = useState("")
//     const [amount , setamount] = useState(0)
// const handleSubmit = (e) => { 
//     e.preventDefault();
//     if (category === '' && amount === 0) {
//         seterror({ category: "category is required", amount: "Enter valid amount" });
//     } else if (amount === 0) {
//         seterror({ category: "", amount: "Enter valid amount" });
//     }
// };
// const handlechangeamount = (e) =>{
//     setamount(e.target.value)
// }

// const handlechangecategory = (e) =>{   
//     secategory(e.target.value)
// }

//     return <form className="form" onSubmit={handleSubmit}>
//         <div className="input-container" onSubmit={handleSubmit}>
//             <div>category</div>
//             <input type="text" onChange={handlechangecategory} className="input" value={category}/>
//          {error.category && <div className="error"> category is required  </div> }
//             <div>Amount</div>
//             <input type="number" className="input" onChange={handlechangeamount} value={amount}/>
//             {error.amount && <div className="error"> Amount required </div>}
//             <button type="submit" onClick={handleSubmit} >Add transaction</button>
//         </div>
//     </form>
// }


import { useState,useEffect } from "react"


export const ExpenseTrackerForm=(props)=>{
    // const handleSubmit
    const [errors,setErrors]=useState({})
    const [category,setcategory]=useState("")
    const[amount,setamount]=useState(0)
    const[date,setDate]=useState(0)

    const handleSubmit=(e)=>{
        e.preventDefault();//to avoid disappearance of error message
         if(category== '' && amount==0 && !date){
            setErrors({...errors,category:"category is required",amount:"Enter valid amount"})
         }
         else if(amount==0){
            setErrors({...errors,category:"",amount:"enter valid amount"})
         }
         else if(!category){
            setErrors({...errors,category:"category is required",amount:""})
            
         }
         else if(!date){
            setErrors({...errors,category:"Date is required",amount:"",})
            
         }

         else{
            if(props.isEdit)
            {
                props.handleClick({category,amount,date,id:props.editData.id})
            }
            else{
                props.handleClick({category,amount,date})
             }
         }
    }
    const handleChangecategory=(e)=>{
        // console.log(e.target.value)
        setcategory(e.target.value)
    }
    const handleChangeAmount=(e)=>{
        // console.log(e.target.value)
        setamount(e.target.value)
    }
    const handleChangeDate=(e)=>{
        // console.log(e.target.value)
        setDate(e.target.value)
    }

    console.log(errors)

    useEffect(()=>
    {
        if(props.isEdit)
        {
            setcategory(props.editData.category)
            setamount(props.editData.amount)
            setDate(props.editData.date)
        }
         
    },[props.isEdit])

return (<form className="form">
    <div className="input-container" onSubmit={handleSubmit} >
        <div>category</div>
        <input type="text" onChange={handleChangecategory} className="input" value={category}/>
        {errors.category &&<div className="error">category is required</div>}
        <div>amount</div>
        <input type="number" onChange={handleChangeAmount}  className="input" value={amount}/>
        {errors.amount &&<div className="error">Amount is required</div>}
        <div>Date</div>
        <input type="string" onChange={handleChangeDate} className="input" value={date}/>
        {errors.date &&<div className="error">Date is required</div>}
        <button type="submit" onClick={handleSubmit}>Add Transaction</button>
    </div>
    
</form>
);
}
