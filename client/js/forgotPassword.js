const forgotPasswordForm = document.querySelector('#forgotPasswordForm');
const emailInput = document.querySelector('#userEmailInput');
const forgotPasswordButton = document.querySelector('#forgotPasswordButton');
const signUpButton = document.querySelector('#signUpButton');
const loginButton = document.querySelector('#loginButton');
const formToastContainer = document.querySelector('#formErrorToastContainer');

function createFormErrorToast(message){
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

loginButton.addEventListener('click',(e)=>{
    window.location.href = './login.html';
})

forgotPasswordForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    
    const email = emailInput.value;

    try{
        const res = await axios.post('http://localhost:3000/user/forgotPassword',{email});
        emailInput.classList.remove('error');
        console.log(res.data);
        window.location.href = res.data.resetPasswordLink;
    }
    catch(err){
        if(err.response.data.isRegisteredEmail===false){
            createFormErrorToast('Email is Not Registered');
            emailInput.classList.add('error');
        }
        console.log(err.response.data.message);
    }
}); 