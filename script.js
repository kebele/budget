/* thanks to traversy media */

balance = document.getElementById('balance');
money_plus = document.getElementById('money-plus');
money_minus = document.getElementById('money-minus');
list = document.getElementById('list');
form = document.getElementById('form');
text = document.getElementById('text');
amount = document.getElementById('amount');

// const dummyTransactions = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 }
// ]

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

// let transactions = dummyTransactions;
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//add transaction
function addTransaction(e){
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === '' ) {
        alert('please add a text and amount');
    } else {
        const transaction =  {
            id : generateID(),
            text : text.value,
            amount : +amount.value //bunu number olarak algılaması için başına + koyduk
        };

        console.log(transaction);
        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

//generate random ID
function generateID(){
    return Math.floor(Math.random() * 100000000);
}


//add transactions to DOM list
function addTransactionDOM (transaction){
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    //add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick ="removeTransaction(${transaction.id})">X</button>
    `;
    list.appendChild(item);
}

//update the balance income and expense

function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc,item) => (acc += item),0).toFixed(2);

    const income = amounts
                    .filter(item => item > 0)
                    .reduce((acc, item) => (acc += item),0)
                    .toFixed(2);

    const expense = (amounts
                        .filter(x => x < 0)
                        .reduce((acc, x) => (acc += x),0) * -1
                        )
                        .toFixed(2);

    console.log(amounts);
    console.log(total);
    console.log(income);
    console.log(expense);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}


//remove transaction by ID

function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}


//update local storage transactions
function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions))
}



//init app
function init(){
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();


//event listeners

form.addEventListener('submit', addTransaction);