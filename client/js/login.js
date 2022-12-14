const loginForm = document.querySelector('#loginForm');
const userNameInput = document.querySelector('#userNameInput');
const passwordInput = document.querySelector('#passwordInput');
const formToastContainer = document.querySelector('#formErrorToastContainer');
const signUpButton = document.querySelector('#signUpButton');
const forgotPasswordButton = document.querySelector('#forgotPasswordButton');

function createFormErrorToast(message){
    passwordInput.classList.remove('error');
    userNameInput.classList.remove('error');
    const toast = document.createElement('div');
    toast.classList.add('error-toast');
    toast.innerText=message;
    formToastContainer.appendChild(toast);
    setTimeout(()=>{
        formToastContainer.removeChild(toast);
    },3000);
}

forgotPasswordButton.addEventListener('click',(e)=>{
    window.location.href = './forgotPassword.html';
})

signUpButton.addEventListener('click',(e)=>{
    window.location.href = './signUp.html';
})

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
        passwordInput.classList.remove('error');
        userNameInput.classList.remove('error');
        localStorage.setItem('userToken',res.data.token);
        localStorage.setItem('isPremium',res.data.isPremium);
        window.location.href='./expense.html';
    }
    catch(err){
        if(err.response.data.userNameValid===false){
            createFormErrorToast('User Not Found');
            userNameInput.classList.add('error');
        }
        else if(err.response.data.passwordValid===false){
            createFormErrorToast('User Not Authorized');
            passwordInput.classList.add('error');
        }
        console.error(err);
    }
})