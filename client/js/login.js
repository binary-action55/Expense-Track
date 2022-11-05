const loginForm = document.querySelector('#loginForm');
const userNameInput = document.querySelector('#userNameInput');
const passwordInput = document.querySelector('#passwordInput');
const formToastContainer = document.querySelector('#formErrorToastContainer');
const signUpButton = document.querySelector('#signUpButton');

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
        loginForm.reset();
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