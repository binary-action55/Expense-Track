const paymentForm = document.querySelector('#paymentForm');
const nameInput = document.querySelector('#nameInput');
const emailInput = document.querySelector('#emailInput');
const cardNumberInput = document.querySelector('#cardNumberInput');
const CVVInput = document.querySelector('#CVVInput');


paymentForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    const cardNumber = cardNumberInput.value.replaceAll('-','');
    const CVV = CVVInput.value;

    const userPaymentDetails = {
        name,
        email,
        cardNumber,
        CVV,
    };

    try{
        const token = localStorage.getItem('userToken');
        await axios.post('http://localhost:3000/payment',userPaymentDetails,{headers:{'Authorization':token}});
        localStorage.setItem('isPremium',true);
        window.location.href='./expense.html';
    }
    catch(err){
        console.log(err);
        alert("ERROR in payment. Try Again");
    }
})
