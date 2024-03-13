 const ExpenseItem=(props) => {
    return <div className="expense-item-container">
        <div className="expense-item">
            <div className= {`expense-item ${props.exp.amount > 0 ? "positive" : "negative" } `} >
                <div> {props.exp.title} </div>
                <div>{props.exp.amount}</div>
                
            </div>
        </div>
        <button className="delete-btn">
            Delete
        </button>   
    </div>
  }
  export default ExpenseItem