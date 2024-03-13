



import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ExpenseTrackerForm } from './screens/expense-tracker-form'
import ExpenseItems from './screens/expense-item'


function App() {



  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [date, setDate] = useState(0)
  const [data, setData] = useState([

  ]);

  const [apiData, setApiData] = useState([]);



  useEffect(() => {
    fetch("https://expensetracker-ryup.onrender.com/get-expense", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [])



  console.log({ data })



  const [isEdit, setIsEdit] = useState(false);
  const [editData, seteditData] = useState({})


  const handleClick = (value) => {

    if (isEdit) {
      const data2 = data.map((detail, index) => {
        if (detail.id === value.id) {
          detail.category = value.category
          detail.amount = value.amount
          detail.date = value.date
        }
        return detail

      });
      setData(data2)
      seteditData({});
      setIsEdit(false);
      if (value.amount > 0) {
        setIncome(income + Number(value.amount))
        setExpense(expense + Number(value.amount))
      }
      else {
        setExpense(expense + Number(value.amount))
        setIncome(income - Number(value.amount))
      }

    } else {

      // let id = data[data.length-1].id+1
      //   SetData([...data,{...value,id:id}])
      //   if(value.amount > 0){
      //     setincome(income+Number(value.amount))
      //   }
      //   else{
      //     setExpense(expense+Number(value.amount))
      //   }


      fetch("https://expensetracker-ryup.onrender.com/add-expense",{method : "POST",

          headers:{"Content-Type" :"application.json"},
          body:JSON.stringify({
            category:value.category,
            amount:value.amount,
          }),
      })
      .then((res) =>res.json())
      .then((data) => setData([...data,value]))

          }
      }





  const handleSubmit = () => {

  }

  const handleDelete = (value) => {
    //   fetch(`https://expensetracker-ryup.onrender.com/delete-expense/${mode : "value._id}`)
    //     .then((res) =>res.json())
    //     .then((data) => setData(data));
    // },[]);




    const updatedData = data.filter(detail => detail.id != value.id)
    setData(updatedData)
    if (value.amount > 0) {
      setIncome(income - Number(value.amount))
    }
    else {
      setExpense(expense - Number(value.amount))
    }


  }

  const handleEdit = (value) => {
    seteditData(value);
    setIsEdit(true);

  }


  useEffect(() => {
    data.map((detail, index) => {
      // console.log(detail)
      if (detail.amount > 0) {
        setIncome((income) => income + detail.amount)
      }
      else {
        setExpense((expense) => expense + detail.amount)
      }
    })
  }, [])
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <div>EXPENSE TRACKER</div>
        <div className='income-expense-container'>
          <div className='income'>
            <div className='category'>
              Income
            </div>
            <div>{income}</div>
          </div>
          <div className='block'></div>
          <div className='expense'>
            <div className='category'>EXPENSE</div>
            <div>{expense}</div>
          </div>
        </div>
        <ExpenseTrackerForm handleClick={handleClick} isEdit={isEdit} editData={editData}></ExpenseTrackerForm>

        {
          data.map((details, index) => {
            return <div className="expense-item-container" key={index}>
              <div className={`expense-item ${details.amount > 0 ? "positive" : "negative"}`}>
                <div>
                  <div>{details.category}</div>
                  <div>{details.amount}</div>
                  <div>{details.date}</div>
                </div>
              </div>
              <button onClick={() => handleDelete(details)} className="delete-btn">Delete</button>
              <button onClick={() => handleEdit(details)} className="edit-btn">Edit</button>
            </div>
          })
        }
      </div>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}



export default App