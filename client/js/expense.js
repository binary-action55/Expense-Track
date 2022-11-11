const expenseForm = document.querySelector('#expenseForm');
const expenseDescriptionInput = document.querySelector('#expenseDescriptionInput');
const expenseAmountInput = document.querySelector('#expenseAmountInput');
const expenseCategoryInput = document.querySelector('#expenseCategoryInput');
const expenseList = document.querySelector('#expenseList');
const downloadList = document.querySelector('#downloadList');
const featureContainer = document.querySelector('#featureContainer');
const pageNavigationContainer = document.querySelector('#pageNavigationContainer');
const numberFormSubmit = document.querySelector('#numberFormSubmit');
const numberPerPageForm = document.querySelector('#numberPerPageForm');
const numerPerPage = document.querySelector('#numerPerPage');

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

function createDownloadListItem(link)
{
    const URL = link.URL; 
    const downloadListItem = document.createElement('li');

    downloadListItem.classList.add('downloadListItem');

    downloadListItem.innerHTML =`<a href="${URL}">${URL.slice(-15)}</a>`;

    downloadList.appendChild(downloadListItem);
}


async function getDownloadList(){
    try{
        const token = localStorage.getItem('userToken');
        const res = await axios.get('http://localhost:3000/expense/downloadList',{headers:{'Authorization':token}}); 
    }
    catch(err){
        console.log(err);
    }
}

async function createExpenseDownLoadList(){
    try{
        const token = localStorage.getItem('userToken');
        const isPremium = localStorage.getItem('isPremium');
        if(isPremium==null && isPremium===false)
            return;
        const res = await axios.get('http://localhost:3000/expense/downloadHistory',{headers:{'Authorization':token}});
        if(!res.data.hasDownloaded)
            return;
        const links = res.data.links;
        for(let link of links){
            createDownloadListItem(link);
        }
    }
    catch(err){
        console.error(err);
    }

}

function createPageNavigationButtons(hasPrevious,currentPage,hasNext){
    pageNavigationContainer.innerHTML="";
    if(hasPrevious)
    {
        const button = document.createElement('button');
        button.innerHTML=`${currentPage-1}`;
        button.setAttribute('onclick',`createExpenseItemList(${currentPage-1})`);
        pageNavigationContainer.appendChild(button);
    }
    const button = document.createElement('button');
    button.innerHTML=`${currentPage}`;
    button.setAttribute('onclick',`createExpenseItemList(${currentPage})`)
    pageNavigationContainer.appendChild(button);
    if(hasNext)
    {
        const button = document.createElement('button');
        button.innerHTML=`${currentPage+1}`;
        button.setAttribute('onclick',`createExpenseItemList(${currentPage+1})`);
        pageNavigationContainer.appendChild(button);
    }
}

async function createExpenseItemList(currentPage){
    expenseList.innerHTML="";
    try{
        const token = localStorage.getItem('userToken');
        const isPremium = localStorage.getItem('isPremium');
        const expensePerPage = localStorage.getItem('expensesPerPage') || 2;
        const res = await axios.get('http://localhost:3000/expense',{params:{currentPage:+currentPage,expensesPerPage: +expensePerPage},headers:{'Authorization':token}});
        const expenses = res.data.expenses;
        if(isPremium!=null && isPremium!==false && expenses.length>0){
            const download = document.createElement('button');
            download.innerText = 'download';
            download.setAttribute('onclick','getDownloadList()');
            expenseList.appendChild(download);
        }
        for(let expense of expenses)
        {
            createExpenseItem(expense);
        }
        createPageNavigationButtons(res.data.hasPreviousPage,+currentPage,res.data.hasNextPage);
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
        createExpenseItemList(1);
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
    createExpenseItemList(1);
    createExpenseDownLoadList();
})


numberPerPageForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    localStorage.setItem('expensesPerPage',numerPerPage.value);
    createExpenseItemList(1);
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
        createExpenseItemList(1);
        expenseForm.reset();
    }
    catch(err){
        console.log(err);
    }
});