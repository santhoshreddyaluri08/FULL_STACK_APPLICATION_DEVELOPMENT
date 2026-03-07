const form = document.getElementById("feedbackForm");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

// Reusable validation function
function validateInput(input) {
    if(input.value.trim() === "") {
        input.style.borderColor = "red";
        return false;
    } else {
        input.style.borderColor = "#ccc";
        return true;
    }
}

// Validate on keypress
form.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("keyup", () => validateInput(input));
});

// Highlight on hover is handled by CSS

// Double-click submit
submitBtn.addEventListener("dblclick", (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll("input, textarea").forEach(input => {
        if(!validateInput(input)) valid = false;
    });

    if(valid) {
        message.innerText = "Feedback submitted successfully!";
        form.reset();
    } else {
        message.innerText = "Please fill all fields correctly!";
        message.style.color = "red";
    }
});