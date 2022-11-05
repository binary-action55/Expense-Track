const signUpForm = document.querySelector('#signUpForm');
const nameInput = document.querySelector('#nameInput');
const emailInput = document.querySelector('#emailInput');
const phoneInput = document.querySelector('#phoneInput');


signUpForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    
    const name = nameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;

    const userDetails = {
        name,
        email,
        phone,
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