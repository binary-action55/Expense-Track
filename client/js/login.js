const loginForm = document.querySelector('#loginForm');
const userNameInput = document.querySelector('#userNameInput');
const passwordInput = document.querySelector('#passwordInput');
const formToastContainer = document.querySelector('#formErrorToastContainer'); 

function createFormErrorToast(message){
    const toast = document.createElement('div');
    toast.classList.add('error-toast');
    toast.innerText=message;
    formToastContainer.appendChild(toast);
    emailInput.classList.add('error');
    setTimeout(()=>{
        formToastContainer.removeChild(toast);
    },3000);
}

loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    
    const userName = userNameInput.value;
    const password = passwordInput.value;

    const userLoginDetails = {
        userName,
        password,
    };

    try{
        const res = await axios.post('http://localhost:3000/user/login',userLoginDetails);
        loginForm.reset();
    }
    catch(err){
        console.error(err.message);
    }
})