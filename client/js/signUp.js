const signUpForm = document.querySelector('#signUpForm');
const nameInput = document.querySelector('#nameInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');


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
        const res = await axios.post('http://localhost:3000/user/signUp',userDetails);
        signUpForm.reset();
    }
    catch(err)
    {
        console.error(res.message);
    }
})