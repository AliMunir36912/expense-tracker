const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const sqlite3 = require('sqlite3');
let sql;

const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err)=> {
    if (err){
        return console.log(err.message)
    }
})



let incomeExpense = {income: 0, expense: 0};
let balance = 0;
let storeTransHistory = [];
let storeTransactions = [];
storeTransactions = [{incomeExpense: incomeExpense}, {balance: balance}, {storeTransHistory: storeTransHistory}]



// console.log(storeTransHistory)
app.post('/loadTransactions', async (req, res) => {
    db.all('SELECT * FROM ExpenseTracker', (err, row) => {
        // console.log("From the Database: ")
        // console.log(row)
        // const rows = []
        // rows.push(row)
        // console.log(rows)
        // console.log(JSON.parse(rows))
        if(row){
            // console.log(row[0])
            let IncomeExpense = JSON.parse(row[0].IncomeExpense);
            let Balance = row[0].Balance;
            let StoreTransHistory = JSON.parse(row[0].TransactionHistory);
            // console.log(IncomeExpense.income, IncomeExpense.expense, Balance, StoreTransHistory)
            // console.log("From the Server: ")
            // console.log(storeTransactions)
            storeTransactions[0].incomeExpense.income = IncomeExpense.income
            storeTransactions[0].incomeExpense.expense = IncomeExpense.expense
            storeTransactions[1].balance = Balance
            storeTransactions[2].storeTransHistory = StoreTransHistory
            // console.log("Result: ")
            // console.log(storeTransactions)
            res.send(storeTransactions)
        }
    } )
   

    

    // res.send(storeTransactions)
})


app.post('/saveTransaction', async (req, res) => {
    // console.log("Transaction saved!!!")
    // console.log(storeTransHistory, incomeExpense, balance)
    
})

app.post("/processTransaction", async (req, res) => {
    const {text, amount} = req.body
    if(amount){
        if( "-" == amount[0]){
            const expense = parseInt(amount.substring(1))
            incomeExpense.expense += expense;
            balance -= expense
            // console.log(incomeExpense);

        } else {
            const income = parseInt(amount)
            balance += income
            incomeExpense.income += income;

        }
    }
    storeTransHistory.push({text: text, amount: amount})
    sql = `UPDATE ExpenseTracker 
           SET IncomeExpense = ?, Balance = ?, TransactionHistory = ? 
           WHERE id = ?`;


    db.run(sql, [JSON.stringify(incomeExpense), balance, JSON.stringify(storeTransHistory), 1], (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log("Transaction updated in the database!");
    });
    
    // console.log(storeTransHistory, incomeExpense, balance)
    // console.log(storeTransHistory)
    res.sendStatus(200);
    
});

app.listen(3000, () => {
    console.log("Listening to Port 3000");
});
