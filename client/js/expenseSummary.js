const expenseList = document.querySelector('.expenseList');
const logoutButton = document.querySelector('#logoutButton');

document.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const userId = urlParams.get('userId');
        const token = localStorage.getItem('userToken');
        const res = await axios.get(`http://localhost:3000/expense/${userId}`,{headers:{'Authorization':token}});
        const expenses = res.data.expenses;
        for(let expense of expenses)
        {
            const item = document.createElement('li');
            item.innerText = `${expense.description}-${expense.amount}-${expense.category}`;
            expenseList.appendChild(item);
        }
    }
    catch(err){
        console.error(err);
    }
});

logoutButton.addEventListener('click',()=>{
    localStorage.clear();
    window.location.href='./login.html';
})