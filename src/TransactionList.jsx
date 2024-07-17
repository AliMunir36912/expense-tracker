import { useState } from 'react'
import './Styles.css'
import TransactionHistory from './TransactionHistory'
import Header from './Header'



export default function TransactionList({incomeExpense, setIncomeExpense, loadTransaction}){
    
    

    
    let expenseAmount = 0;
    let incomeAmount = 0;

    function getIncomeExpense(transaction){

            

            if (transaction.text == "" || transaction.amount == ""){
                return null
            }
        
        // console.log(transactionArray)
            else if (!transaction.amount || transaction.amount == NaN){
                return null;
            }
            else if ('-' == transaction.amount[0]){
               expenseAmount = parseInt(transaction.amount.substring(1));
            //    console.log(`Expense: ${expenseAmount}`) 
               
               setIncomeExpense(currData => {
                return {...currData, expense: currData.expense + expenseAmount}
               })
                
            }
            else {
                incomeAmount = parseInt(transaction.amount);
                setIncomeExpense(currData => {
                    return {...currData, income: currData.income + incomeAmount}
                   })
            }
        
            
           
        
        // storeData.expense += expenseAmount;
        // storeData.income += incomeAmount;
        // expenseAmount = 0
        // incomeAmount = 0;
        
        // setIncomeExpense(storeData)
        // console.log(incomeExpense)

    
    }
   
  
    
    return (
        <div>
            <div className="TransactionList">
                <div className='Income'>
                    <h3>Income</h3>
                    <h4 >${incomeExpense.income}.00</h4>
                </div>
                <div>
                    <h3>Expense</h3>
                    <h4>${incomeExpense.expense}.00</h4>
                </div>
            </div>
            <TransactionHistory loadTransaction={loadTransaction} incomeExpense={incomeExpense} getIncomeExpense={getIncomeExpense}/>
        </div>
        
    )
}