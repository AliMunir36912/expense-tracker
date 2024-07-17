import { useState, useEffect } from 'react'
import './Styles.css'
import TransactionList from './TransactionList'






export default function Header({loadTransaction}){
    const [incomeExpense, setIncomeExpense] = useState({income: 0, expense: 0})
    useEffect(()=> {
        if (loadTransaction.length > 0) {
            // console.log(loadTransaction);
            const {incomeExpense} = loadTransaction[0];
            // console.log(incomeExpense.income)
            // console.log(incomeExpense.expense)
            setIncomeExpense(currData=> { 
                return {...currData, income: incomeExpense.income, expense: incomeExpense.expense}
            })
              
          } else {
            console.log('No transactions available');
          }
    }, [loadTransaction])
   

    

    return (
        <div className='headerContainer'>
            <h1 className='expenseTracker'>Expense Tracker</h1>
            <div className='Balance'>
                <h2 className='balanceName'><span>Your Balance</span></h2>
                <h2 className='balanceAmount'>${incomeExpense.income - incomeExpense.expense}.00</h2>
            </div>
            <TransactionList loadTransaction={loadTransaction} incomeExpense={incomeExpense} setIncomeExpense={setIncomeExpense}/>
        </div>
    )
}