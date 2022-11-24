const expenseLeaderBoardList = document.querySelector('#expenseLeaderBoardList');
const logoutButton = document.querySelector('#logoutButton');

document.addEventListener('DOMContentLoaded', async ()=>{
    try{
        const token = localStorage.getItem('userToken');
        const res = await axios.get('http://localhost:3000/expense/leaderBoard',{headers:{Authorization:token}});
        console.log(res.data.userExpenseLeaderBoard);
        for(let item of res.data.userExpenseLeaderBoard){
            console.log(item);
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href='./expenseSummary.html?userId=${item.id}'>${item.name} - ${item.total}</a>`;
            expenseLeaderBoardList.appendChild(listItem);
        }
    }
    catch(err){
        console.log(err);
    }
})

logoutButton.addEventListener('click',()=>{
    localStorage.clear();
    window.location.href='./login.html';
})