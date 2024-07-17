import NewTransaction from "./NewTransaction"
import { useEffect, useState } from "react"

export default function TransactionHistory({getIncomeExpense, incomeExpense, loadTransaction}){

    // console.log(loadTransaction[2])
    const [historyList, setHistoryList] = useState([]);

    useEffect(()=> {
        if (loadTransaction.length > 0){
            // console.log(loadTransaction[2])
            const {storeTransHistory} = loadTransaction[2];
            console.log(...storeTransHistory)
            setHistoryList(currData => {
                return [...storeTransHistory]
            })
        }
        else {
            console.log("Ignored!")
        }
    }, [loadTransaction])
   

    

    async function addToHistory(transHistory){
        if (transHistory.text == "" || transHistory.amount == ""){
            return null
        }
        else {
            setHistoryList(currData => {
                return [...currData, transHistory]
            })
        }
        
    }
    // getIncomeExpense(historyList);

    return <div>
        <h3 className="historyName">History</h3>
        <ul className="historyList">
            {/* <li className="listItem">
                <h4>Cash</h4>
                <h4>+500</h4>
            </li>
            <li className="listItem">
                <h4>Book</h4>
                <h4>-40</h4>
            </li>
            <li className="listItem">
                <h4>Cash</h4>
                <h4>-200</h4>
            </li> */}
            {historyList.map((list, index) => <li key={index} className="listItem" >
                <h4>{list.text}</h4>
                <h4>{list.amount}</h4>
            </li>)}
        </ul>
        <NewTransaction incomeExpense={incomeExpense} addToHistory={addToHistory} historyList={historyList} getincomeExpense={getIncomeExpense}/>
    </div>
}