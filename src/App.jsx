import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import TransactionList from './TransactionList'
import TransactionHistory from './TransactionHistory'
import axios from 'axios'


function App() {
  const [count, setCount] = useState(0);
  const [loadTransaction, setLoadTransaction] = useState([])
  
  

    useEffect(()=>{
    const loadTransactions= axios.post("http://localhost:3000/loadTransactions")
    .then(data => 
      {
        return data.data
      });
    loadTransactions.then(data => { 
      setLoadTransaction(data)
      
  
      })
      // console.log(loadTransaction)
    }, [])
 
    
    

  return (
    <div>
      <Header loadTransaction={loadTransaction}/>
      

    </div>
  )
}

export default App
