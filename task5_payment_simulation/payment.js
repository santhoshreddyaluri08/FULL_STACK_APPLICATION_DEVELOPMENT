const form = document.getElementById("paymentForm");
const msg = document.getElementById("message");

form.addEventListener("submit", e=>{
    e.preventDefault();
    const user = form.user.value;
    const merchant = form.merchant.value;
    const amount = form.amount.value;

    fetch("http://localhost:3000/pay", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({user, merchant, amount})
    })
    .then(res=>res.json())
    .then(data=>{
        msg.innerText = data.message;
    })
    .catch(err=>console.error(err));
});