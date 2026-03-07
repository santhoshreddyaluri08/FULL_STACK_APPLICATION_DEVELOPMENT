const form = document.getElementById("loginForm");
const errorDiv = document.getElementById("error");

form.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent form submission

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
        errorDiv.innerText = "All fields are required!";
        return;
    }

    // Simple email format check
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        errorDiv.innerText = "Invalid email format!";
        return;
    }

    // Send data to backend to check credentials
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){
            alert("Login successful!");
            errorDiv.innerText = "";
        } else {
            errorDiv.innerText = "Invalid credentials!";
        }
    })
    .catch(err => console.error(err));
});