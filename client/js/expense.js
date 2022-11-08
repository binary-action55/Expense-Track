const expenseForm = document.querySelector('#expenseForm');
const expenseDescriptionInput = document.querySelector('#expenseDescriptionInput');
const expenseAmountInput = document.querySelector('#expenseAmountInput');
const expenseCategoryInput = document.querySelector('#expenseCategoryInput');
const expenseList = document.querySelector('#expenseList');
const featureContainer = document.querySelector('#featureContainer');

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

async function getPremiumService(){
    window.location.href='./payment.html';
}

async function toggleTheme(){
    const body = document.querySelector('body');
    body.classList.toggle('dark');
}

function createFeatureSection(){
    const isPremium = localStorage.getItem('isPremium');
    if(isPremium==null || isPremium==='false'){
        const getPremiumButton = document.createElement('button');
        getPremiumButton.setAttribute('onclick','getPremiumService()');
        getPremiumButton.innerText='Get Premium';
        featureContainer.appendChild(getPremiumButton);
        return;
    }
    featureContainer.innerHTML=`
    <button class="dropDownButton"><i class="fa fa-bars"></i></button>
    <div class="dropDownContent">
    <a onclick=toggleTheme()>Toggle Theme</a>
    <a href='./expenseLeaderBoard.html'>Leader Board</a>
    `;
}

document.addEventListener('DOMContentLoaded',()=>{
    createFeatureSection();
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