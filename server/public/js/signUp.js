const signUpForm = document.querySelector('#signUpForm');
const nameInput = document.querySelector('#nameInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const formToastContainer = document.querySelector('#formErrorToastContainer');
const loginButton = document.querySelector('#loginButton');

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

loginButton.addEventListener('click',()=> {
    window.location.href='./login.html';
})

signUpForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    const userDetails = {
        name,
        email,
        password,
    };

    try{
        const res = await axios.post('http://3.108.252.114:3000/user/signUp',userDetails)
        window.location.href='./login.html';
    }
    catch(err){
        if(err.response.data.uniqueEmail===false){
            const msg = "Email Id is already registered";
            createFormErrorToast(msg);
        }
        console.error(err.message);
    }
})