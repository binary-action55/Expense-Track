const signUpForm = document.querySelector('#signUpForm');
const nameInput = document.querySelector('#nameInput');
const emailInput = document.querySelector('#emailInput');
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
        const res = await axios.post('http://localhost:3000/user/signUp',userDetails)
        emailInput.classList.remove('error');
        signUpForm.reset();
    }
    catch(err){
        if(err.response.data.uniqueEmail===false){
            const msg = "Email Id is already registered";
            createFormErrorToast(msg);
        }
        console.error(err.message);
    }
})