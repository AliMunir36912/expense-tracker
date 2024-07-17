import './Styles.css'
import { useState } from 'react'

export default function NewTransaction({addToHistory, getincomeExpense, historyList, incomeExpense}){

    
    const [transaction, setTransaction] = useState({text: "", amount: ""});

    function setValue(e){
        setTransaction(currData => {
            return {...currData, [e.target.name]: e.target.value}
        })
    }

    async function addTransaction(e){
       e.preventDefault();
       if (transaction.text == "" && transaction.amount == ""){
        return "Transaction is Empty"
       }
       else {
       addToHistory(transaction);
       }
       setTransaction(currData => {
        return {...currData, text: "", amount: ""}
       })
       const response = await fetch("http://localhost:3000/processTransaction", 
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...transaction,
            })

        }
       )

       if (response.ok){
        console.log("Transaction processed successfully")
        
       } else {
        console.error("Error processing transaction");
    }

    }

    async function saveTransactions(e){
        e.preventDefault();
        const response = await fetch("http://localhost:3000/saveTransaction", 
            {
                method: "POST",
                headers:  {
                    "Content-Type": "application/json"
                }
            }
        )
        if (response.ok){
            console.log("Transaction saved Successfully!")
        }

    }
    
    

    return (
    <div>
        <h3>Add New Transaction</h3>
        <div>
            <form  onSubmit={addTransaction}>
                <div className="textBox">
                    <label htmlFor="text">Text</label>
                    <input value={transaction.text} onChange={setValue} className='inputText' placeholder="Enter text..." type="text" name="text" id="text" />
                </div>
                <div className="amountBox">
                    <label htmlFor="amount">Amount</label>
                    <input value={transaction.amount} onChange={setValue} className='amountText' placeholder="Enter amount..." type="number" name="amount" id="amount" />
                </div>
                <div>
                    <button  onClick={()=> getincomeExpense(transaction)}>Add transaction</button>
                </div>
                
            </form>
            <form onSubmit={saveTransactions}>
                <button>Save</button>
            </form>
        </div>
    </div>
    )
}