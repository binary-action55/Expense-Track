const expenseForm = document.querySelector('#expenseForm');
const expenseDescriptionInput = document.querySelector('#expenseDescriptionInput');
const expenseAmountInput = document.querySelector('#expenseAmountInput');
const expenseCategoryInput = document.querySelector('#expenseCategoryInput');
const expenseList = document.querySelector('#expenseList');

function createExpenseItem(expenseDetails)
{
    const {id,description,amount,category} = expenseDetails;    
    const expenseListItem = document.createElement('li');
    
    expenseListItem.classList.add('expenseListItem');
    expenseListItem.dataset.id=id;
    expenseListItem.dataset.description=description;
    expenseListItem.dataset.amount=amount;
    expenseListItem.dataset.category=category;

    expenseListItem.innerHTML =`
    <span class='expenseDescription'>${description}-</span>
    <span class='expenseAmount'>${amount}-</span>
    <span class='expenseCategory'>${category}</span>
    <button class='expenseItemDelete' onclick=deleteExpenseListItem(this)>Delete</button>
    `;

    expenseList.appendChild(expenseListItem);
}

async function createExpenseItemList(){
    try{
        const token = localStorage.getItem('userToken');
        const res = await axios.get('http://localhost:3000/expense',{headers:{'Authorization':token}});
        const expenses = res.data.expenses;
        for(let expense of expenses)
        {
            createExpenseItem(expense);
        }
    }
    catch(err){
        console.error(err);
    }

}

async function deleteExpenseListItem(obj){
    const parent = obj.parentElement;
    const id = parent.dataset.id;
    const token = localStorage.getItem('userToken');
    try{
        await axios.delete(`http://localhost:3000/expense/${id}`,{headers:{'Authorization':token}})
        expenseList.removeChild(parent);
    }
    catch(err){
        console.error(err);
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    createExpenseItemList();
})

expenseForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    try{
        const token = localStorage.getItem('userToken');
        const res = await axios.post('http://localhost:3000/expense',{
            description:expenseDescriptionInput.value,
            amount:expenseAmountInput.value,
            category:expenseCategoryInput.value,     
        },{headers:{'Authorization':token}});
        createExpenseItem(res.data.expense);
        expenseForm.reset();
    }
    catch(err){
        console.log(err);
    }
});