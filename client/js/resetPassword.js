const resetPasswordForm = document.querySelector('#resetPasswordForm');
const passwordInput = document.querySelector('#passwordInput');


document.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const password = passwordInput.value;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    const email = urlParams.get('email');
    try{
        const res = await axios.post('http://localhost:3000/user/resetPassword',{email,password,token});
        alert('Password reset Successful');
    }
    catch(err){
        console.log(err);
    }
});